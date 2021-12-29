package com.tcspa.movieProject.controller.request;

import java.util.Date;

import com.tcspa.movieProject.model.logging.LogLevel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
public class LogEntry {
	
	private Date entryDate = new Date();
	
	private String Message;
	
	private String location = "java";
	
	private LogLevel level;
	
	private Object[] extraInfo;
	
	public String buildLogString() {
		String log = "";
		
		log += this.entryDate + " - ";
		log += "Type: " + this.level.name();
		
		if (this.extraInfo.length > 0) {
			log += " - Extra Info: " + this.formatParams(this.extraInfo);
		}
		
		return log;
	}
	
	private String formatParams(Object[] params) {
		String log = "";
		for (int i = 0; i < params.length; i++) {
			log += params[i];
		}
		return log;
	}
}
