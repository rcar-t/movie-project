import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LogService } from "../logging/log.service";
import { AlertService } from "../services/alert.service";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        // private logService: LogService,
        // private alertService: AlertService
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err) => {
                if ([401,403].includes(err.status) && this.authenticationService.currentUserValue) {
                    this.authenticationService.logout();
                }
                const error = this.handleErrors(err)
                // this.logService.error(error);
                // this.alertService.error(error);
                return observableThrowError(error);
            })
        )
    }

    private handleErrors(error: any): string{
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return errorMessage;
    }
}