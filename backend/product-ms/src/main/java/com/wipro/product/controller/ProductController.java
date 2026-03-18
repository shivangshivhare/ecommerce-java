package com.wipro.product.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> delete(@PathVariable Long id) {

        boolean deleted = service.delete(id);

        if (deleted) {
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Product deleted successfully"
            ));
        } else {
            return ResponseEntity.status(404).body(Map.of(
                "success", false,
                "message", "Product not found"
            ));
        }
    }
    @GetMapping
    public List<ProductDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ProductDTO getById(@PathVariable Long id) {
        return service.getById(id); 
    
    }
}