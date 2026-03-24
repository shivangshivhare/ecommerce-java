package com.wipro.userwrite.service.impl;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.userwrite.entity.User;
import com.wipro.userwrite.repo.UserRepository;
import com.wipro.userwrite.service.UserService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker; 

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository repo;

    private static final String CB_NAME = "userServiceCB";
    @Override
    public User save(User user) {

        // here hash password
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);

     
        if (user.getRole() == null) {
            user.setRole("CUSTOMER");
        }

        return repo.save(user);
    }

    
    @Override
    public User login(String email, String password) {

        Optional<User> optionalUser = repo.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            
            if (BCrypt.checkpw(password, user.getPassword())) {
                return user;
            }
        }

        return null; 
    }

   
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
            dbUser.setRole(user.getRole());
            return repo.save(dbUser);
        }

        return null;
    }
    @Override
    @CircuitBreaker(name = CB_NAME, fallbackMethod = "fallbackUser")
    public User getById(Long id) {

        if (id == 99) {
            throw new RuntimeException("Service Down");
        }

        return repo.findById(id).orElse(null);
    }

 
    public User fallbackUser(Long id, Exception ex) {

        User user = new User();

        user.setId(id);
        user.setUsername("Default User");
        user.setEmail("fallback@gmail.com");
        user.setFirstName("Service");
        user.setLastName("Unavailable");
        user.setRole("GUEST");

        return user;
    }

   
   
    @Override
    public List<User> getAll() {
        return repo.findAll();
    }

   
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