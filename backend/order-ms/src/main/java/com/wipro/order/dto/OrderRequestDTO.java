package com.wipro.order.dto;

import java.time.LocalDateTime;

public class OrderRequestDTO {

    private Long userId;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    private LocalDateTime orderTime;

	public LocalDateTime getOrderTime() {
		return orderTime;
	}
	public void setOrderTime(LocalDateTime orderTime) {
		this.orderTime = orderTime;
	}
}