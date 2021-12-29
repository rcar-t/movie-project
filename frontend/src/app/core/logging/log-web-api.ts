import { LogPublisher } from "./log-publisher";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { LogEntry } from "./log-model";
import { environment as env } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

export class LogWebApi extends LogPublisher {
    
    constructor(private http: HttpClient) {
        super();
        this.location = "/api/log";
    }

    log(entry: LogEntry): Observable<boolean> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(`${env.SPRING_URL}${this.location}`, entry, {headers:headers})
            .pipe(
                map(response => {
                    return true;
                }),
                catchError((error) => {
                    return throwError(error);
                })
            );
            
    }

    clear(): Observable<boolean> {
        return of(true);
    }
}