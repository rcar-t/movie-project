package com.tcspa.movieProject.service;

import com.tcspa.movieProject.dto.model.user.UserDto;

public interface AuthenticationService {

	UserDto login(UserDto user);

}
