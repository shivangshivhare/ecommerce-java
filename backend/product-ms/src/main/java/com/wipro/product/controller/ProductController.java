package com.wipro.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wipro.product.dto.ProductDTO;
import com.wipro.product.service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    ProductService service;

    @PostMapping
    public ProductDTO save(@RequestBody ProductDTO dto) {
        return service.save(dto);
    }

    @PutMapping
    public ProductDTO update(@RequestBody ProductDTO dto) {
        return service.update(dto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {

        boolean deleted = service.delete(id);

        if (deleted) return "Deleted";
        else throw new RuntimeException("Not found");
    }

    @GetMapping
    public List<ProductDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ProductDTO getById(@PathVariable Long id) {

        ProductDTO dto = service.getById(id);

        if (dto == null) throw new RuntimeException("Not found");

        return dto;
    }
}