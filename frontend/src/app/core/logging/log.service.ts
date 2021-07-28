import { relative } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { LogLevel } from './log-level';
import { LogEntry } from './log-model';
import { LogPublisher } from './log-publisher';
import { LogPublisherService } from './log-publisher.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  level: LogLevel = LogLevel.All;
  logWithDate: boolean = true;
  publishers: LogPublisher[] = [];

  constructor(private publishersService: LogPublisherService) { 
    this.publishers = this.publishersService.publishers;
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      let entry: LogEntry = new LogEntry();
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;

      for (let logger of this.publishers) {
        logger.log(entry).subscribe(response => console.log(response));
      }
  }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret: boolean = false; 

    if ((level >= this.level && level !== LogLevel.Off) || this.level === LogLevel.All) {
      ret = true;
    }
    return ret;
  }

}
