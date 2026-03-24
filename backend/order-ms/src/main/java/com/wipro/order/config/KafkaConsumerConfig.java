package com.wipro.order.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.*;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.*;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import com.wipro.order.entity.Order;

@Configuration
public class KafkaConsumerConfig {

	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, Order>
	kafkaListenerContainerFactory() {

	    JsonDeserializer<Order> deserializer =
	            new JsonDeserializer<>(Order.class);

	    deserializer.addTrustedPackages("com.wipro.order.entity");
	    deserializer.setRemoveTypeHeaders(true);
	    deserializer.setUseTypeMapperForKey(false);
	    deserializer.setUseTypeHeaders(false);

	    Map<String, Object> props = new HashMap<>();

	    props.put(
	        ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
	        "localhost:9092"
	    );

	    props.put(
	        ConsumerConfig.GROUP_ID_CONFIG,
	        "order-group"
	    );

	    DefaultKafkaConsumerFactory<String, Order> factory =
	            new DefaultKafkaConsumerFactory<>(
	                    props,
	                    new StringDeserializer(),
	                    deserializer
	            );

	    ConcurrentKafkaListenerContainerFactory<String, Order> listener =
	            new ConcurrentKafkaListenerContainerFactory<>();

	    listener.setConsumerFactory(factory);

	    return listener;
	}
	}