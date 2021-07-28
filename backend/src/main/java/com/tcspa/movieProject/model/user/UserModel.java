package com.tcspa.movieProject.model.user;

import java.util.Collection;

import javax.management.relation.Role;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "MEMBERS",
	indexes = @Index(
		name="idx_user_email_asc",
		columnList = "email",
		unique = true))
public class UserModel {
	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_Sequence")
	@SequenceGenerator(name="id_Sequence", sequenceName = "ID_SEQ")
	private long id;
	
	@Column(unique=true)
	private String email;
	
	private String password;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name="user_role",
				joinColumns =  {@JoinColumn(name = "user_id")},
				inverseJoinColumns = {@JoinColumn(name="role_id")})
	private Collection<RoleModel> roles;
	
	private String getFullName() {
		return firstName != null ? firstName.concat(" ").concat(lastName) : "";
	}
	
}
