package com.wipro.order.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import com.wipro.order.entity.Order;
import com.wipro.order.repo.OrderRepo;

@Service
public class OrderConsumer {

    @Autowired
    private OrderRepo repo;

    @KafkaListener(topics = "order-success", groupId = "order-group")
    public void success(Order order) {

        Order db = repo.findById(order.getId()).orElse(null);

        if (db != null) {
            db.setStatus("COMPLETED");
            repo.save(db);
        }
    }

    @KafkaListener(topics = "order-failed", groupId = "order-group")
    public void failed(Order order) {

        Order db = repo.findById(order.getId()).orElse(null);

        if (db != null) {
            db.setStatus("FAILED");
            repo.save(db);
        }
    }
}