
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LogConsole } from './log-console';
import { LogLocalStorage } from './log-local-storage';
import { LogPublisher } from './log-publisher';
import { LogPublisherConfig } from './log-publisher-config';
import { LogWebApi } from './log-web-api';

const PUBLISHERS_FILE = "/src/app/assets/log-publishers.json";

@Injectable({
  providedIn: 'root'
})
export class LogPublisherService {

  constructor(private http: HttpClient) { 
    this.buildPublishers();
  }

  publishers: LogPublisher[] = [];

  getLoggers(): Observable<LogPublisherConfig[]> {
    return this.http.get<LogPublisherConfig[]>(PUBLISHERS_FILE)
      .pipe(
        catchError((err) => {
          return throwError(err)
        })
      )
  }

  buildPublishers(): void {
    let logPub: LogPublisher;

    this.getLoggers().subscribe(response => {
      for (let pub of response.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case "console":
            logPub = new LogConsole();
            break;
          case "localstorage":
            logPub = new LogLocalStorage();
            break;
          case "webapi":
            logPub = new LogWebApi(this.http);
            break;
        }

        logPub.location = pub.loggerLocation;
        this.publishers.push(logPub);
      }
    })

    
  }


}
