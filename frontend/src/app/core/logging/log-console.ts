import { Observable, of } from "rxjs";
import { LogEntry } from "./log-model";
import { LogPublisher } from "./log-publisher";

export class LogConsole extends LogPublisher {
    
    log (entry: LogEntry): Observable<boolean> {
        console.log(entry.buildLogString());
        return of(true);
    }

    clear(): Observable<boolean> {
        console.clear();
        return of(true);
    }
}