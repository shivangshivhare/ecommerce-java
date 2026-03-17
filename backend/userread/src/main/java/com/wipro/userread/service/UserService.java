package com.wipro.userread.service;
import java.util.List;
import com.wipro.userread.dto.UserDTO;

public interface UserService {
	 List<UserDTO> getAllUsers();

	    UserDTO getUserById(Long id);
}
