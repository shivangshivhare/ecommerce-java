package com.wipro.product.kafka;

import com.wipro.product.model.Order;
import com.wipro.product.model.OrderItem;
import com.wipro.product.service.ProductService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ProductConsumer {

    private final ProductService productService;
    private final ProductProducer producer;

    public ProductConsumer(
            ProductService productService,
            ProductProducer producer) {
        this.productService = productService;
        this.producer = producer;
    }

    @KafkaListener(
            topics = "order-created",
            groupId = "product-group",
            containerFactory = "kafkaListenerContainerFactory"
    )
    public void consume(Order order) {

        System.out.println("Received order: " + order);

        try {

            for (OrderItem item : order.getItems()) {

                productService.reduceQuantity(
                        item.getProductId(),
                        item.getQuantity()
                );
            }

            producer.success(order);

        } catch (Exception e) {

            System.out.println("Inventory Failed: " + e.getMessage());

            producer.failed(order);
        }
    }
}