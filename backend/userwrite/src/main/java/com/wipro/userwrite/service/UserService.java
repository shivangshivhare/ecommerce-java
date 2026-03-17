package com.wipro.userwrite.service;

import java.util.List;

import com.wipro.userwrite.entity.User;
public interface UserService {
	User save(User user);

    User login(String email, String password);

    User update(User user);

    User getById(Long id);

    List<User> getAll();

    boolean deleteById(Long id);
}
