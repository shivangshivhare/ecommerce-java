package com.wipro.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.wipro.order.dto.*;
import com.wipro.order.service.OrderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/order")
@Tag(name = "Order Controller", description = "Order Management APIs")
public class OrderController {

    @Autowired
    private OrderService service;

    @Operation(summary = "Create order")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Order created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request")
    })
    @PostMapping
    public OrderResponseDTO create(@RequestBody OrderRequestDTO request) {
        return service.createOrder(request);
    }

    @Operation(summary = "Get all orders")
    @ApiResponse(responseCode = "200", description = "Orders fetched successfully")
    @GetMapping
    public List<OrderResponseDTO> getAll() {
        return service.getAll();
    }

    @Operation(summary = "Get orders by user id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Orders fetched"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/user/{userId}")
    public List<OrderResponseDTO> getByUser(@PathVariable Long userId) {
        return service.getOrdersByUser(userId);
    }

    @Operation(summary = "Cancel order")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Order cancelled"),
            @ApiResponse(responseCode = "404", description = "Order not found")
    })
    @PutMapping("/cancel/{orderId}")
    public String cancelOrder(@PathVariable Long orderId) {
        service.cancelOrder(orderId);
        return "Order cancelled";
    }
}