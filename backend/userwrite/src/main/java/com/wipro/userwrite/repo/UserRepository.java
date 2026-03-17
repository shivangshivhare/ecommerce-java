package com.wipro.userwrite.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wipro.userwrite.entity.User;
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
}
