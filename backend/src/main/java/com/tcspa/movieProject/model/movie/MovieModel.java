package com.tcspa.movieProject.model.movie;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "MOVIE")
public class MovieModel {
	@Id
	@Column(name="movie_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="id_Sequence")
	@SequenceGenerator(name="id_Sqeuence", sequenceName="ID_SEQ")
	private String id;
	
	private String title;
	
	private String overview;
}
