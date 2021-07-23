package com.tcspa.movieProject.security;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.tcspa.movieProject.security.api.ApiJWTAuthenticationFilter;
import com.tcspa.movieProject.security.api.ApiJWTAuthorizationFilter;
import com.tcspa.movieProject.security.form.CustomAuthenticationSuccessHandler;
import com.tcspa.movieProject.security.form.CustomLogoutSuccessHandler;

@Configuration
@EnableWebSecurity(debug=true)
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MultiHttpSecurityConfig extends WebSecurityConfigurerAdapter {
	
//	@Configuration
//	@Order(1)
//	public static class ApiWebSecurityConfigurationAdapter {
		
		@Autowired
		private BCryptPasswordEncoder bCryptPasswordEncoder;
		
		@Autowired
		private CustomUserDetailService userDetailsService;
		
		@Autowired
		private CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
		
		@Override
		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
			auth
				.userDetailsService(userDetailsService)
				.passwordEncoder(bCryptPasswordEncoder);
		}
		
		protected void configure(HttpSecurity http) throws Exception {
			http
				.cors()
				.and()
				.csrf().disable()
				.sessionManagement()
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.addFilter(new ApiJWTAuthenticationFilter(authenticationManager()))
				.addFilter(new ApiJWTAuthorizationFilter(authenticationManager()))
				.authorizeRequests()
				.antMatchers("/api/user/signup").permitAll()
				.antMatchers("/login").permitAll()
				.anyRequest().authenticated()
				.and()
				.exceptionHandling().authenticationEntryPoint((req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED));
				
		}
//	}
	
//	@Order(2)
//	@Configuration
//	public static class FormLoginWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {
//		
//		@Autowired
//		private BCryptPasswordEncoder bCryptPasswordEncoder;
//		
//		@Autowired
//		private CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
//		
//		@Autowired
//		private CustomUserDetailService userDetailsService;
//		
//		@Override
//		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//			auth
//				.userDetailsService(userDetailsService)
//				.passwordEncoder(bCryptPasswordEncoder);
//		}
//		
//		@Override
//		protected void configure (HttpSecurity http) throws Exception {
//			
//			http
//				.cors()
//				.and()
//				.csrf().disable()
//				.authorizeRequests()
//				.antMatchers("/").permitAll()
//				.antMatchers("/login").permitAll()
//				.antMatchers("/signup").permitAll()
//				.antMatchers("/dashboard/**").hasAuthority("ADMIN")
//				.anyRequest().authenticated()
//				.and()
//				.formLogin()
//					.loginPage("/login").permitAll()
//					.failureUrl("/login?error=true")
//					.usernameParameter("email")
//					.passwordParameter("password")
//				.successHandler(customAuthenticationSuccessHandler)
//				.and()
//				.logout().permitAll()
//				.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//				.logoutSuccessHandler(new CustomLogoutSuccessHandler())
//				.deleteCookies("JSESSIONID")
//				.logoutSuccessUrl("/")
//				.and()
//				.exceptionHandling();
//		}
//	}
}
