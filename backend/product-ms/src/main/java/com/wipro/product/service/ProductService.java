package com.wipro.product.service;

import java.util.List;
import com.wipro.product.dto.ProductDTO;

public interface ProductService {

    ProductDTO save(ProductDTO dto);

    ProductDTO update(ProductDTO dto);

    boolean delete(Long id);

    List<ProductDTO> getAll();

    ProductDTO getById(Long id);
    List<String> getCategories();
    
}