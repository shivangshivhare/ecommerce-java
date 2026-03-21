package com.wipro.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.wipro.order.dto.*;
import com.wipro.order.service.OrderService;

@RestController
@RequestMapping("/order")
@CrossOrigin("*")
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
}