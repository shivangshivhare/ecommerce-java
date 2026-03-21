package com.wipro.order.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wipro.order.entity.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {
}