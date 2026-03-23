package com.wipro.order.service;

import java.util.List;
import com.wipro.order.dto.OrderRequestDTO;
import com.wipro.order.dto.OrderResponseDTO;
import com.wipro.order.entity.Order;

public interface OrderService {

    OrderResponseDTO createOrder(OrderRequestDTO request);

    List<OrderResponseDTO> getAll();
    List<OrderResponseDTO> getOrdersByUser(Long userId);
    void cancelOrder(Long orderId);
}