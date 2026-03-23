package com.wipro.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import com.wipro.order.dto.*;
import com.wipro.order.entity.Order;
import com.wipro.order.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService service;

    @PostMapping
    public OrderResponseDTO create(@RequestBody OrderRequestDTO request) {
        return service.createOrder(request);
    }

    @GetMapping
    public List<OrderResponseDTO> getAll() {
        return service.getAll();
    }
    @GetMapping("/{userId}")
    public List<OrderResponseDTO> getByUser(@PathVariable Long userId) {
        return service.getOrdersByUser(userId);
    }
    @PutMapping("/cancel/{orderId}")
    public String cancelOrder(@PathVariable Long orderId) {
        service.cancelOrder(orderId);
        return "Order cancelled";
    }
}