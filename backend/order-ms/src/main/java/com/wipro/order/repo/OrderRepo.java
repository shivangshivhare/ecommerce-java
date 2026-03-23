package com.wipro.order.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wipro.order.entity.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {
	List<Order> findByUserId(Long userId);
}