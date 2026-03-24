package com.wipro.order.service.impl;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import com.wipro.order.dto.OrderRequestDTO;
import com.wipro.order.dto.OrderResponseDTO;

import com.wipro.order.entity.Cart;
import com.wipro.order.entity.Order;
import com.wipro.order.entity.OrderItem;

import com.wipro.order.repo.CartRepo;
import com.wipro.order.repo.OrderRepo;

import com.wipro.order.service.OrderService;
import com.wipro.order.kafka.OrderProducer;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private OrderProducer producer;


    @CircuitBreaker(
            name = "productService",
            fallbackMethod = "fallbackOrder"
    )
    @Override
    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO request) {

        Long userId = request.getUserId();

        List<Cart> cartItems = cartRepo.findByUserId(userId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();

        order.setUserId(userId);
        order.setStatus("PROCESSING");
        order.setOrderTime(java.time.LocalDateTime.now());

        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        for (Cart c : cartItems) {

            OrderItem item = new OrderItem();

            item.setProductId(c.getProductId());
            item.setQuantity(c.getQuantity());
            item.setPrice(c.getPrice());
            item.setName(c.getName());
            item.setImage(c.getImage());

            total += c.getPrice() * c.getQuantity();

            items.add(item);
        }

        order.setItems(items);
        order.setTotalAmount(total);

        Order saved = orderRepo.save(order);

        // clear cart
        cartRepo.deleteByUserId(userId);

        // kafka sending
        producer.sendOrder(saved);

        return mapToDTO(saved);
    }


    // Circuit Breaker Fallback
    public OrderResponseDTO fallbackOrder(
            OrderRequestDTO request,
            Exception ex
    ) {

        OrderResponseDTO dto = new OrderResponseDTO();

        dto.setStatus("FAILED");
        dto.setMessage("Product service unavailable or insufficient inventory");

        return dto;
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
    @Override
    public void cancelOrder(Long orderId) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus("CANCELLED");

        orderRepo.save(order);
    }


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