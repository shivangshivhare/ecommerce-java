//package com.wipro.product.kafka;
//
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//@Service
//public class ProductConsumer {
//
//    @KafkaListener(topics = "order-created", groupId = "product-group")
//    public void consume(Order order) {
//
//        System.out.println("Received order: " + order.getId());
//    }
//}
