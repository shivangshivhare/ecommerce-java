package com.wipro.userwrite.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.userwrite.entity.User;
import com.wipro.userwrite.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

   
    @PostMapping
    public User register(@RequestBody User user) {
        user.setRole("CUSTOMER");
        return service.save(user);
    }

 
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User loggedUser = service.login(user.getEmail(), user.getPassword());

        if (loggedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }

        return ResponseEntity.ok(loggedUser);
    }
    
    @PutMapping
    public User update(@RequestBody User user) {

        User updated = service.update(user);

        if (updated == null) {
            throw new RuntimeException("User not found");
        }

        return updated;
    }

    // GET BY ID
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {

        User user = service.getById(id);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return user;
    }

    // GET ALL USERS
    @GetMapping
    public List<User> getAllUsers() {
        return service.getAll();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

        boolean deleted = service.deleteById(id);

        if (deleted) {
            return "User deleted successfully";
        }

        throw new RuntimeException("User not found");
    }
}