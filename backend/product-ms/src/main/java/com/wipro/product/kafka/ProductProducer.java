package com.wipro.product.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.wipro.product.model.Order;

@Service
public class ProductProducer {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    public void success(Order order) {

        kafkaTemplate.send("order-success", order);

        System.out.println("Order Success Sent");
    }

    public void failed(Order order) {

        kafkaTemplate.send("order-failed", order);

        System.out.println("Order Failed Sent");
    }
}