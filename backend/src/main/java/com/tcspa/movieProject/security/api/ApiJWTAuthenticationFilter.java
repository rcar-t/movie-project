package com.tcspa.movieProject.security.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tcspa.movieProject.controller.request.LoginRequest;
import com.tcspa.movieProject.model.user.UserModel;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import static com.tcspa.movieProject.security.SecurityConstants.*;

public class ApiJWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	
	private final AuthenticationManager authenticationManager;
	
	public ApiJWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager; 
		this.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/auth/login", "POST"));
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) 
		throws AuthenticationException {
		try {
			UserModel user = new ObjectMapper().readValue(request.getInputStream(), UserModel.class);
			return authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							user.getEmail(),
							user.getPassword(),
							new ArrayList<>())
			);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, 
			FilterChain chain, Authentication auth) throws IOException, ServletException {
		
		if (auth.getPrincipal() != null) {
			org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) auth.getPrincipal();
			
			String login = user.getUsername();
			
			if (login != null && login.length() > 0) {
				Claims claims = Jwts.claims().setSubject(login);
				List<String> roles = new ArrayList<>();
				
				user.getAuthorities().stream().forEach(authority -> roles.add(authority.getAuthority()));
				claims.put("roles", roles);
				
				String token = Jwts.builder()
						.setClaims(claims)
						.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
						.signWith(SignatureAlgorithm.HS512, SECRET)
						.compact();
				response.addHeader(HEADER_STRING, TOKEN_PREFIX + token);

				request.getServletContext()
					.getRequestDispatcher("/login?email="+login+"&token="+token)
					.forward(request, response);
			}
		}
	}
}
