package com.tcspa.movieProject.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.tcspa.movieProject.dto.model.response.Response;

public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler{
	
	Logger logger = LoggerFactory.getLogger(CustomizedResponseEntityExceptionHandler.class);
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public final ResponseEntity handleValidationError(MethodArgumentNotValidException ex) {
		Response response = Response.validationException();
		response.addErrorMsgToResponse(ex.getMessage(), ex);
		logger.error(ex.getMessage());
		return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MovieException.EntityNotFoundException.class)
	public final ResponseEntity handleNotFoundExeptions(Exception ex, WebRequest request) {
		Response response = Response.notFound();
		response.addErrorMsgToResponse(ex.getMessage(), ex);
		logger.error(ex.getMessage());
		return new ResponseEntity(response, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(MovieException.DuplicateEntityException.class)
	public final ResponseEntity handleDuplicateExeptions(Exception ex, WebRequest request) {
		Response response = Response.duplicateEntity();
		response.addErrorMsgToResponse(ex.getMessage(), ex);
		logger.error(ex.getMessage());
		return new ResponseEntity(response, HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler({Exception.class})
	public ResponseEntity handleAll(Exception ex, WebRequest request) {
		Response response = Response.exception();
		response.addErrorMsgToResponse(ex.getMessage(), ex);
		logger.error(ex.getMessage());
		return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
