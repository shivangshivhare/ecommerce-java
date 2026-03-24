package com.wipro.order.test;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import com.wipro.order.controller.OrderController;
import com.wipro.order.dto.OrderRequestDTO;
import com.wipro.order.dto.OrderResponseDTO;
import com.wipro.order.service.OrderService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @Test
    void testCreateOrder() throws Exception {

        OrderResponseDTO response = new OrderResponseDTO();
        when(orderService.createOrder(org.mockito.ArgumentMatchers.any(OrderRequestDTO.class)))
                .thenReturn(response);

        mockMvc.perform(post("/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetAllOrders() throws Exception {

        List<OrderResponseDTO> list =
                Arrays.asList(new OrderResponseDTO(), new OrderResponseDTO());

        when(orderService.getAll()).thenReturn(list);

        mockMvc.perform(get("/order"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetOrdersByUser() throws Exception {

        List<OrderResponseDTO> list =
                Arrays.asList(new OrderResponseDTO(), new OrderResponseDTO());

        when(orderService.getOrdersByUser(1L)).thenReturn(list);

        mockMvc.perform(get("/order/user/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testCancelOrder() throws Exception {

        doNothing().when(orderService).cancelOrder(1L);

        mockMvc.perform(put("/order/cancel/1"))
                .andExpect(status().isOk());
    }
}