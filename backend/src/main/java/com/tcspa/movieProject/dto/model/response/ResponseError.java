
package com.tcspa.movieProject.dto.model.response;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain=true)
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseError {
	private Date timestamp;
	private String message;
	private String details;
}
