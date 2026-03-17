package com.wipro.userread.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wipro.userread.dto.UserDTO;
import com.wipro.userread.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserService service;

    // GET ALL USERS
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return service.getAllUsers();
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {

        UserDTO user = service.getUserById(id);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return user;
    }
}