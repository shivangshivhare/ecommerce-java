package com.wipro.product.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.product.dto.ProductDTO;
import com.wipro.product.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/product")
@Tag(name = "Product Controller", description = "Product Management APIs")
public class ProductController {

    @Autowired
    ProductService service;

    @Operation(summary = "Create product")
    @ApiResponse(responseCode = "200", description = "Product created successfully")
    @PostMapping
    public ProductDTO save(@RequestBody ProductDTO dto) {
        return service.save(dto);
    }

    @Operation(summary = "Delete product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product deleted"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
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

    @Operation(summary = "Get all products")
    @ApiResponse(responseCode = "200", description = "Products fetched successfully")
    @GetMapping
    public List<ProductDTO> getAll() {
        return service.getAll();
    }

    @Operation(summary = "Get product by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product found"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @GetMapping("/{id:\\d+}")
    public ProductDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @Operation(summary = "Get all categories")
    @ApiResponse(responseCode = "200", description = "Categories fetched successfully")
    @GetMapping("/categories")
    public List<String> getCategories() {
        return service.getCategories();
    }

    @Operation(summary = "Update product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product updated"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @PutMapping("/{id}")
    public ProductDTO update(@PathVariable Long id, @RequestBody ProductDTO dto) {
        dto.setId(id);
        return service.update(dto);
    }

}