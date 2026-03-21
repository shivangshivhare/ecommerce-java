package com.wipro.order.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "product-ms", url = "http://localhost:8082")
public interface ProductClient {

    @GetMapping("/product/{id}")
    Object getProduct(@PathVariable Long id);
}