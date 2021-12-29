package com.tcspa.movieProject.service;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.ResourceBundle;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.tcspa.movieProject.dto.model.mapper.UserMapper;
import com.tcspa.movieProject.dto.model.user.UserDto;
import com.tcspa.movieProject.exception.EntityType;
import com.tcspa.movieProject.exception.ExceptionType;
import com.tcspa.movieProject.exception.MovieException;
import com.tcspa.movieProject.model.user.RoleModel;
import com.tcspa.movieProject.model.user.UserModel;
import com.tcspa.movieProject.model.user.UserRoles;
import com.tcspa.movieProject.repository.user.RoleRepository;
import com.tcspa.movieProject.repository.user.UserRepository;

import static com.tcspa.movieProject.exception.EntityType.USER;
import static com.tcspa.movieProject.exception.ExceptionType.DUPLICATE_ENTITY;
import static com.tcspa.movieProject.exception.ExceptionType.ENTITY_NOT_FOUND;

@Component
public class UserServiceImpl implements UserService {
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	ResourceBundle messages = ResourceBundle.getBundle("messages");
	
	private boolean roleAdded = false;
	
	@Override
	public UserDto signup(UserDto userDto) {
		RoleModel userRole; 
		UserModel user = userRepository.findByEmail(userDto.getEmail());
		
		if (user == null) {
			if (userDto.isAdmin()) {
				userRole = roleRepository.findByRole(UserRoles.ADMIN);
			} else {
				userRole = roleRepository.findByRole(UserRoles.USER);
			}
			
			user = new UserModel()
					.setEmail(userDto.getEmail())
					.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()))
					.setRoles(new HashSet<>(Arrays.asList(userRole)))
					.setFirstName(userDto.getFirstName())
					.setLastName(userDto.getLastName());
			return UserMapper.toUserDto(userRepository.save(user));
		}
	
//		log.error(getErrorMsg(DUPLICATE_ENTITY, userDto.getEmail()));
		throw exception(USER, DUPLICATE_ENTITY, userDto.getEmail());
	}
	
	@Transactional
	public UserDto findUserByEmail(String email) {
		Optional<UserModel> user = Optional.ofNullable(userRepository.findByEmail(email));
		if (user.isPresent()) {
			return modelMapper.map(user.get(), UserDto.class);
		}
		
//		log.error(getErrorMsg(ENTITY_NOT_FOUND, email));
		throw exception(USER, ENTITY_NOT_FOUND, email);
	}
	
	private RuntimeException exception(EntityType entityType, ExceptionType exceptionType, String...args) {
		return MovieException.throwException(entityType, exceptionType, args);
	}
	
	private String getErrorMsg(ExceptionType error, String...args) {
		return MessageFormat.format(messages.getString("user.".concat(error.getValue().toLowerCase())), (Object[]) args);
	}
}
 