package com.tcspa.movieProject.controller.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginRequest {
	
	@NotEmpty(message = "{constraints.NotEmpty.message}")
	@Email
	private String email; 
	
	@NotEmpty(message = "{constraints.NotEmpty.message}")
	private String token;
}
