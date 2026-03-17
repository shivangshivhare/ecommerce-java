package com.wipro.userread.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wipro.userread.entity.User;
public interface UserRepository extends JpaRepository<User, Long> {

}
