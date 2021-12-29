package com.tcspa.movieProject.service;

import com.tcspa.movieProject.dto.model.user.UserDto;

public interface UserService {
	
	public UserDto signup(UserDto userDto);

	public UserDto findUserByEmail(String email);
}
