package com.tcspa.movieProject.model.user;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Accessors(chain=true)
@Entity
@Table(name="role")
public class RoleModel {
	@Id
	@Column(name="role_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_Sequence")
	@SequenceGenerator(name="id_Sequence", sequenceName = "ID_SEQ")
	private long id;
	
	@Enumerated(EnumType.STRING)
	@Convert(converter = RoleConverter.class)
	private UserRoles role;
	
	@ManyToMany(mappedBy = "roles")
	private Collection<UserModel> users;
}
