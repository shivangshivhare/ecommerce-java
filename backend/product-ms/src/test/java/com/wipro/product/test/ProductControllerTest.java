package com.wipro.product.test;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import com.wipro.product.controller.ProductController;
import com.wipro.product.dto.ProductDTO;
import com.wipro.product.service.ProductService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService service;

    @Test
    void testGetById() throws Exception {

        ProductDTO dto = new ProductDTO();
        when(service.getById(1L)).thenReturn(dto);

        mockMvc.perform(get("/product/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetAll() throws Exception {

        List<ProductDTO> list = Arrays.asList(new ProductDTO(), new ProductDTO());
        when(service.getAll()).thenReturn(list);

        mockMvc.perform(get("/product"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetCategories() throws Exception {

        List<String> list = Arrays.asList("Electronics", "Clothing");
        when(service.getCategories()).thenReturn(list);

        mockMvc.perform(get("/product/categories"))
                .andExpect(status().isOk());
    }

    @Test
    void testSave() throws Exception {

        ProductDTO dto = new ProductDTO();
        when(service.save(org.mockito.ArgumentMatchers.any(ProductDTO.class)))
                .thenReturn(dto);

        mockMvc.perform(post("/product")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isOk());
    }

    @Test
    void testUpdate() throws Exception {

        ProductDTO dto = new ProductDTO();
        when(service.update(org.mockito.ArgumentMatchers.any(ProductDTO.class)))
                .thenReturn(dto);

        mockMvc.perform(put("/product/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isOk());
    }

    @Test
    void testDelete() throws Exception {

        when(service.delete(1L)).thenReturn(true);

        mockMvc.perform(delete("/product/1"))
                .andExpect(status().isOk());
    }
}