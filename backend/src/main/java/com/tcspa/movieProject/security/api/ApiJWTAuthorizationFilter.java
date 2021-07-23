package com.tcspa.movieProject.security.api;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import static com.tcspa.movieProject.security.SecurityConstants.*;

public class ApiJWTAuthorizationFilter extends BasicAuthenticationFilter {

	public ApiJWTAuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}
	

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String header = request.getHeader(HEADER_STRING);
		if (header == null || !header.startsWith(TOKEN_PREFIX)) {
			chain.doFilter(request, response);
			return;
		}
		
		UsernamePasswordAuthenticationToken authentication = getAuthentication(request);
		SecurityContext context = SecurityContextHolder.createEmptyContext();
		context.setAuthentication(authentication);
		SecurityContextHolder.setContext(context);
		
		chain.doFilter(request, response);
	}
	
	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader(HEADER_STRING);
		if (token != null) {
			Claims claims = Jwts.parser()
					.setSigningKey(SECRET)
					.parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
					.getBody();
			
			String user = claims.getSubject();
			
			ArrayList<String> roles = (ArrayList<String>) claims.get("roles");
			
			ArrayList<GrantedAuthority> list = new ArrayList<>();
			
			if (roles != null) {
				for(String a: roles) {
					GrantedAuthority g = new SimpleGrantedAuthority(a);
					list.add(g);
				}
			}
			
			if (user != null) {
				return new UsernamePasswordAuthenticationToken(user, null, list);
			}
			return null;
		}
		return null;
	}
}
