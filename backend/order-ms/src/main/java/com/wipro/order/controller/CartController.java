package com.wipro.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.wipro.order.dto.CartResponseDTO;
import com.wipro.order.dto.ProductDTO;
import com.wipro.order.entity.Cart;
import com.wipro.order.feign.ProductClient;
import com.wipro.order.repo.CartRepo;

@RestController
@RequestMapping("/cart")
public class CartController {
	@Autowired
	private ProductClient productClient;
    @Autowired
    private CartRepo repo;

    @PostMapping("/addProd")
    public Cart add(@RequestBody Cart cart) {

        Cart existing = repo.findByUserIdAndProductId(
            cart.getUserId(), cart.getProductId()
        );

        if (existing != null) {
        	existing.setQuantity(existing.getQuantity() + cart.getQuantity());
            return repo.save(existing);
        }

        return repo.save(cart);
    }
    @GetMapping("/{userId}")
    public List<CartResponseDTO> getCart(@PathVariable Long userId) {

        List<Cart> cartList = repo.findByUserId(userId);
        List<CartResponseDTO> response = new ArrayList<>();

        for (Cart cart : cartList) {

        	ProductDTO product = productClient.getProduct(cart.getProductId());

            CartResponseDTO dto = new CartResponseDTO();

            dto.setId(cart.getId());
            dto.setProductId(cart.getProductId());
            dto.setQuantity(cart.getQuantity());
            dto.setPrice(cart.getPrice());

            dto.setName(product.getName());
            dto.setImage(product.getImageUrl());

            response.add(dto);
        }

        return response;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
    @PutMapping("/updateQty/{id}")
    public Cart updateQty(@PathVariable Long id, @RequestParam Integer qty) {

        Cart cart = repo.findById(id).orElseThrow();

        cart.setQuantity(qty);

        return repo.save(cart);
    }
    @DeleteMapping("/clear/{userId}")
    public void clearCart(@PathVariable Long userId) {
        List<Cart> items = repo.findByUserId(userId);
        repo.deleteAll(items);
    }
}