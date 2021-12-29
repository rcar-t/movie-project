package com.tcspa.movieProject.model.logging;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum LogLevel {
	All(0),
	Debug(1),
	Info(2),
	Warn(3),
	Error(4),
	Fatal(5),
	Off(6);
	
	private final int logCode;

	LogLevel(int logCode) {
		this.logCode = logCode;
	}
	
	public int getLevelCode() {
		return this.logCode;
	}
	
	@JsonCreator
	public static LogLevel getLevelFromCode(int value) {
		for (LogLevel level: LogLevel.values()) {
			if (level.getLevelCode() == value) {
				return level;
			}
		}
		return null;
	}
}
