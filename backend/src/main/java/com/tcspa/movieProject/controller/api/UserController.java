package com.tcspa.movieProject.controller.api;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcspa.movieProject.controller.request.LoginRequest;
import com.tcspa.movieProject.controller.request.UserSignupRequest;
import com.tcspa.movieProject.dto.model.response.Response;
import com.tcspa.movieProject.dto.model.user.UserDto;
import com.tcspa.movieProject.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {
	
//	Logger logger = LogManager.getLogger(UserController.class);
	
	@Autowired 
	private UserService userService;
	
	@PostMapping("/signup")
	public Response signup(@RequestBody @Valid UserSignupRequest userSignupRequest) {
		return Response.ok().setPayload(registerUser(userSignupRequest, false));
	}
	
	private UserDto registerUser(UserSignupRequest userSignupRequest, boolean isAdmin) {
		UserDto userDto = new UserDto()
				.setEmail(userSignupRequest.getEmail())
				.setPassword(userSignupRequest.getPassword())
				.setFirstName(userSignupRequest.getFirstName())
				.setLastName(userSignupRequest.getLastName())
				.setAdmin(isAdmin);
		
		return userService.signup(userDto);
	}
}
