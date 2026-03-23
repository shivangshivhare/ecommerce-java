package com.wipro.order.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.wipro.order.entity.Cart;

public interface CartRepo extends JpaRepository<Cart, Long> {

    List<Cart> findByUserId(Long userId);
    Cart findByUserIdAndProductId(Long userId, Long productId);
    void deleteByUserId(Long userId);

}