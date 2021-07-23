package com.tcspa.movieProject.dto.model.mapper;

import java.util.HashSet;
import java.util.stream.Collectors;

import com.tcspa.movieProject.dto.model.user.UserDto;
import com.tcspa.movieProject.dto.model.user.RoleDto;
import com.tcspa.movieProject.model.user.UserModel;
import org.modelmapper.ModelMapper;

public class UserMapper {
	
	public static UserDto toUserDto(UserModel user) {
		return new UserDto()
					.setEmail(user.getEmail())
					.setPassword(user.getPassword())
					.setFirstName(user.getFirstName())
					.setLastName(user.getLastName())
					.setRoles(new HashSet<RoleDto>(user
							.getRoles()
							.stream()
							.map(role -> new ModelMapper().map(role, RoleDto.class))
							.collect(Collectors.toSet())));
	}
}
