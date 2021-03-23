import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../models/response';
import { Logger } from '../services/logger.service';

const log = new Logger('ErrorHandlerInterceptor');

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<ApiResponse<any>>> {
    return next.handle(req).pipe(catchError(error => this.errorHandler(error)));
  }

  private errorHandler(error: HttpEvent<ApiResponse<any>>): Observable<HttpEvent<ApiResponse<any>>> {
    if (!environment.production) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          log.error('Response error', error.status + error.message);
          return throwError('User not authorized!');
        }
        const applicationError = error.headers.get('Application-Error');
        if (applicationError) {
          let error = JSON.parse(applicationError);
          log.error('Application error', error.Message);
          return throwError(error.Message);
        }
        const serverError = error.error;
        let modalStateErrors = '';
        if (serverError && typeof serverError === 'object') {
          for (const key in serverError) {
            if (serverError[key]) {
              modalStateErrors += serverError[key] + '\n';
            }
          }
        }
        return throwError(modalStateErrors || serverError || 'Server Error');
      }
    }
    return throwError(error);
  }
}
