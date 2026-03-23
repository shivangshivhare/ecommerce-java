package com.wipro.order.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import com.wipro.order.dto.*;
import com.wipro.order.entity.*;
import com.wipro.order.repo.*;
import com.wipro.order.service.OrderService;

import jakarta.transaction.Transactional;

import com.wipro.order.kafka.OrderProducer;
import com.wipro.order.feign.ProductClient;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private OrderProducer producer;

    @Autowired
    private ProductClient productClient;
    @Transactional
    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO request) {

        Long userId = request.getUserId();

        List<Cart> cartItems = cartRepo.findByUserId(userId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        for (Cart c : cartItems) {

            ProductDTO product = productClient.getProduct(c.getProductId());

            if (product == null) {
                throw new RuntimeException("Product not found");
            }

            // 🔥 STOCK VALIDATION
            if (product.getQuantity() < c.getQuantity()) {
                throw new RuntimeException("Insufficient stock for " + product.getName());
            }

            // 🔥 REDUCE STOCK
            product.setQuantity(product.getQuantity() - c.getQuantity());

            // 🔥 CALL PRODUCT SERVICE (VERY IMPORTANT)
            productClient.updateProduct(product.getId(), product);

            OrderItem item = new OrderItem();

            item.setProductId(c.getProductId());
            item.setQuantity(c.getQuantity());
            item.setPrice(product.getPrice());
            item.setImage(product.getImageUrl());
            item.setName(product.getName());

            total += product.getPrice() * c.getQuantity();

            items.add(item);
        }

        Order order = new Order();

        order.setUserId(userId);
        order.setItems(items);
        order.setTotalAmount(total);
        order.setStatus("CREATED");
        order.setOrderTime(java.time.LocalDateTime.now());

        Order saved = orderRepo.save(order);

        // 🔥 SEND KAFKA EVENT
        producer.sendOrderEvent(saved);

        // 🔥 CLEAR CART
        cartRepo.deleteByUserId(userId);

        return mapToDTO(saved);
    }
    @Override
    public List<OrderResponseDTO> getAll() {

        List<Order> orders = orderRepo.findAll();
        List<OrderResponseDTO> response = new ArrayList<>();

        for (Order o : orders) {
            response.add(mapToDTO(o));
        }

        return response;
    }

    public OrderResponseDTO mapToDTO(Order order) {

        OrderResponseDTO dto = new OrderResponseDTO();

        dto.setId(order.getId());
        dto.setUserId(order.getUserId());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setItems(order.getItems());

        return dto;
    }
    @Override
    public List<OrderResponseDTO> getOrdersByUser(Long userId) {

        List<Order> orders = orderRepo.findByUserId(userId);

        List<OrderResponseDTO> response = new ArrayList<>();

        for (Order o : orders) {
            response.add(mapToDTO(o));
        }

        return response;
    }
    @Transactional
    public void cancelOrder(Long orderId) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getStatus().equals("CREATED")) {
            throw new RuntimeException("Cannot cancel this order");
        }

        order.setStatus("CANCELLED");

        orderRepo.save(order);
    }
}