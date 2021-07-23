package com.tcspa.movieProject.repository.user;

import org.springframework.data.repository.CrudRepository;

import com.tcspa.movieProject.model.user.RoleModel;
import com.tcspa.movieProject.model.user.UserRoles;

public interface RoleRepository extends CrudRepository<RoleModel, Long>{
	
	RoleModel findByRole(UserRoles role);

}
