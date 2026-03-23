package com.wipro.order.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.wipro.order.dto.ProductDTO;

@FeignClient(name = "PRODUCT-MS")
public interface ProductClient {

    @GetMapping("/product/{id}")
    ProductDTO getProduct(@PathVariable Long id);

    // for stock redude
    @PutMapping("/product/{id}")
    void updateProduct(@PathVariable Long id, @RequestBody ProductDTO product);
}