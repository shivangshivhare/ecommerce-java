package com.wipro.userwrite.service.impl;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.userwrite.entity.User;
import com.wipro.userwrite.repo.UserRepository;
import com.wipro.userwrite.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository repo;

    // REGISTER USER
    @Override
    public User save(User user) {

        // hash password
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);

        // default role
        if (user.getRole() == null) {
            user.setRole("CUSTOMER");
        }

        return repo.save(user);
    }

    // LOGIN
    @Override
    public User login(String email, String password) {

        Optional<User> optionalUser = repo.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // check password
            if (BCrypt.checkpw(password, user.getPassword())) {
                return user;
            }
        }

        return null; // invalid login
    }

    // UPDATE USER
    @Override
    public User update(User user) {

        Optional<User> existing = repo.findById(user.getId());

        if (existing.isPresent()) {
            User dbUser = existing.get();

            dbUser.setUsername(user.getUsername());
            dbUser.setFirstName(user.getFirstName());
            dbUser.setLastName(user.getLastName());
            dbUser.setPhoneNumber(user.getPhoneNumber());
            dbUser.setAddress(user.getAddress());

            return repo.save(dbUser);
        }

        return null;
    }

    // GET USER BY ID
    @Override
    public User getById(Long id) {

        Optional<User> user = repo.findById(id);

        return user.orElse(null);
    }

    // GET ALL USERS
    @Override
    public List<User> getAll() {
        return repo.findAll();
    }

    // DELETE USER
    @Override
    public boolean deleteById(Long id) {

        try {
            repo.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
}