package com.wipro.userwrite.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.userwrite.entity.User;
import com.wipro.userwrite.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/user")
@Tag(name = "User Controller", description = "User Management APIs")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // REGISTER USER
    @Operation(summary = "Register new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User registered successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public User register(@RequestBody User user) {
        user.setRole("CUSTOMER");
        return service.save(user);
    }

    // LOGIN
    @Operation(summary = "User login")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful"),
            @ApiResponse(responseCode = "401", description = "Invalid credentials")
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User loggedUser = service.login(user.getEmail(), user.getPassword());

        if (loggedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }

        return ResponseEntity.ok(loggedUser);
    }

    // UPDATE
    @Operation(summary = "Update user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PutMapping
    public User update(@RequestBody User user) {

        User updated = service.update(user);

        if (updated == null) {
            throw new RuntimeException("User not found");
        }

        return updated;
    }

    // GET BY ID
    @Operation(summary = "Get user by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User found"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {

        User user = service.getById(id);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return user;
    }

    // GET ALL USERS
    @Operation(summary = "Get all users")
    @ApiResponse(responseCode = "200", description = "Users fetched successfully")
    @GetMapping
    public List<User> getAllUsers() {
        return service.getAll();
    }

    // DELETE
    @Operation(summary = "Delete user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User deleted"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

        boolean deleted = service.deleteById(id);

        if (deleted) {
            return "User deleted successfully";
        }

        throw new RuntimeException("User not found");
    }
}