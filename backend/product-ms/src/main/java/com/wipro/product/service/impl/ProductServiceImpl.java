package com.wipro.product.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.product.dto.ProductDTO;
import com.wipro.product.entity.Product;
import com.wipro.product.repo.ProductRepo;
import com.wipro.product.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepo repo;
    @Override
    public ProductDTO save(ProductDTO dto) {

        Product product = mapToEntity(dto);
        Product saved = repo.save(product);

        return mapToDTO(saved);
    }

    @Override
    public ProductDTO update(ProductDTO dto) {

        Optional<Product> optional = repo.findById(dto.getId());

        if (optional.isPresent()) {
            Product product = optional.get();

            product.setName(dto.getName());
            product.setCategory(dto.getCategory());
            product.setPrice(dto.getPrice());
            product.setUom(dto.getUom());
            product.setQuantity(dto.getQuantity());
            product.setDescription(dto.getDescription());
            product.setImageUrl(dto.getImageUrl());

            return mapToDTO(repo.save(product));
        }

        return null;
    }

    @Override
    public boolean delete(Long id) {

        try {
            repo.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    @Override
    public List<ProductDTO> getAll() {

        List<Product> list = repo.findAll();
        List<ProductDTO> dtoList = new ArrayList<>();

        for (Product p : list) {
            dtoList.add(mapToDTO(p));
        }

        return dtoList;
    }

    @Override
    public ProductDTO getById(Long id) {

        Optional<Product> optional = repo.findById(id);

        if (optional.isPresent()) {
            return mapToDTO(optional.get());
        }

        return null;
    }

    
    private Product mapToEntity(ProductDTO dto) {

        Product p = new Product();

        p.setId(dto.getId());
        p.setName(dto.getName());
        p.setCategory(dto.getCategory());
        p.setPrice(dto.getPrice());
        p.setUom(dto.getUom());
        p.setQuantity(dto.getQuantity());
        p.setDescription(dto.getDescription());
        p.setImageUrl(dto.getImageUrl());

        return p;
    }

    private ProductDTO mapToDTO(Product p) {

        ProductDTO dto = new ProductDTO();

        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setCategory(p.getCategory());
        dto.setPrice(p.getPrice());
        dto.setUom(p.getUom());
        dto.setQuantity(p.getQuantity());
        dto.setDescription(p.getDescription());
        dto.setImageUrl(p.getImageUrl());
        return dto;
    }
}