package com.wipro.order.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import com.wipro.order.dto.*;
import com.wipro.order.entity.*;
import com.wipro.order.repo.*;
import com.wipro.order.service.OrderService;
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

            Object product = productClient.getProduct(c.getProductId());

            if (product == null) {
                throw new RuntimeException("Product not found");
            }

            OrderItem item = new OrderItem();
            item.setProductId(c.getProductId());
            item.setQuantity(c.getQuantity());
            item.setPrice(c.getPrice());

            total += c.getPrice() * c.getQuantity();
            items.add(item);
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setItems(items);
        order.setTotalAmount(total);
        order.setStatus("CREATED");

        Order saved = orderRepo.save(order);

        producer.sendOrderEvent(saved);

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

    // MAPPER METHOD
    private OrderResponseDTO mapToDTO(Order order) {

        OrderResponseDTO dto = new OrderResponseDTO();

        dto.setId(order.getId());
        dto.setUserId(order.getUserId());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setItems(order.getItems());

        return dto;
    }
}