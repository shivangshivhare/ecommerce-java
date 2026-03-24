package com.wipro.order.feign;

import org.springframework.stereotype.Component;
import com.wipro.order.dto.ProductDTO;

@Component
public class ProductFallback implements ProductClient {

    @Override
    public ProductDTO getProduct(Long id) {

        ProductDTO product = new ProductDTO();

        product.setId(id);
        product.setName("Service Unavailable");
        product.setQuantity(0);
        product.setPrice(0.0);

        return product;
    }
}