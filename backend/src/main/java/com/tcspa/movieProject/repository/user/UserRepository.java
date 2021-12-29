package com.tcspa.movieProject.repository.user;

import org.springframework.data.repository.CrudRepository;

import com.tcspa.movieProject.model.user.UserModel;

public interface UserRepository extends CrudRepository<UserModel,Long>{
	UserModel findByEmail(String email);
}
