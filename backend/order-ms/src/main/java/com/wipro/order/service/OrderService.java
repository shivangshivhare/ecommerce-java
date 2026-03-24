package com.wipro.order.service;

import java.util.List;
import com.wipro.order.dto.OrderRequestDTO;
import com.wipro.order.dto.OrderResponseDTO;


public interface OrderService {

    OrderResponseDTO createOrder(OrderRequestDTO request);

    List<OrderResponseDTO> getAll();
    List<OrderResponseDTO> getOrdersByUser(Long userId);
    void cancelOrder(Long orderId);
}