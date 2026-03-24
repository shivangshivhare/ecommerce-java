package com.wipro.userread.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wipro.userread.dto.UserDTO;
import com.wipro.userread.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/user")
@Tag(name = "User Read Controller", description = "User Read APIs")
public class UserController {

    @Autowired
    UserService service;

    @Operation(summary = "Get all users")
    @ApiResponse(responseCode = "200", description = "Users fetched successfully")
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return service.getAllUsers();
    }

    @Operation(summary = "Get user by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User found"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {

        UserDTO user = service.getUserById(id);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return user;
    }
}