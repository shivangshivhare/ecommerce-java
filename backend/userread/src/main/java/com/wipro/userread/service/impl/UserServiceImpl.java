package com.wipro.userread.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.userread.dto.UserDTO;
import com.wipro.userread.entity.User;
import com.wipro.userread.repo.UserRepository;
import com.wipro.userread.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository repo;

    @Override
    public List<UserDTO> getAllUsers() {

        List<User> users = repo.findAll();
        List<UserDTO> dtoList = new ArrayList<>();

        for (User user : users) {
            dtoList.add(convertToDTO(user));
        }

        return dtoList;
    }

    @Override
    public UserDTO getUserById(Long id) {

        Optional<User> optional = repo.findById(id);

        if (optional.isPresent()) {
            return convertToDTO(optional.get());
        }

        return null;
    }

    // MAPPING METHOD
    private UserDTO convertToDTO(User user) {

        UserDTO dto = new UserDTO();

        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setAddress(user.getAddress());
        dto.setRole(user.getRole());

        return dto;
    }
}