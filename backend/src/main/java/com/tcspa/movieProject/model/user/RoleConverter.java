package com.tcspa.movieProject.model.user;

import java.util.Arrays;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class RoleConverter implements AttributeConverter<UserRoles, String>{

	@Override
	public String convertToDatabaseColumn(UserRoles userRole) {
		return userRole == null
				? null
				: userRole.name();
	}

	@Override
	public UserRoles convertToEntityAttribute(String dbData) {
		if (dbData == null || dbData.isEmpty()) return null;
		
		return Arrays.stream(UserRoles.values())
				.filter(c -> c.name().equals(dbData))
				.findAny()
				.orElseThrow(IllegalArgumentException::new);
	}

}
