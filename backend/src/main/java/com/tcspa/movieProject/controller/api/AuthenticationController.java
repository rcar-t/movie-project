package com.tcspa.movieProject.controller.api;

import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tcspa.movieProject.controller.request.LoginRequest;
import com.tcspa.movieProject.dto.model.response.Response;
import com.tcspa.movieProject.dto.model.user.UserDto;
import com.tcspa.movieProject.service.AuthenticationService;

@RestController
@CrossOrigin
public class AuthenticationController {
	
//	@Autowired
//	AuthenticationService authenticationService;
	
	@PostMapping("/login")
	public Response login(@RequestParam Map<String,String> requestParams) {
		LoginRequest loginReq = new LoginRequest()
				.setEmail(requestParams.get("email"))
				.setToken(requestParams.get("token"));
		return Response.ok().setPayload(loginReq);
	}
	
	@PostMapping("/error")
	public Response loginError() {
		return Response.unauthorized();
	}
	
//	private UserDto userLogin(LoginRequest loginRequest) {
//		UserDto userDto = new UserDto()
//				.setEmail(loginRequest.getEmail())
//				.setPassword(loginRequest.getPassword());
//		return authenticationService.login(userDto);
//	}
}
