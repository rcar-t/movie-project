package com.tcspa.movieProject.controller.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcspa.movieProject.controller.request.LogEntry;
import com.tcspa.movieProject.dto.model.response.Response;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class LoggingController {
	
	Logger logger = LoggerFactory.getLogger(LoggingController.class);
	
	@PostMapping("/log")
	public Response log(@RequestBody LogEntry entry) {
		
		switch(entry.getLevel()) {
			case All:
				logger.trace(entry.buildLogString());
				break;
			case Debug: 
				logger.debug(entry.buildLogString());
				break;
			case Info: 
				logger.info(entry.buildLogString());
				break;
			case Warn: 
				logger.warn(entry.buildLogString());
				break;
			case Error: 
				logger.error(entry.buildLogString());
				break;
			case Fatal:
				break;
			case Off:
				break;
			default:
				break;
		}
		return Response.ok().setPayload(entry);
	}
}
