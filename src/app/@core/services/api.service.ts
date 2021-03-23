import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { Logger } from './logger.service';
import { ApiResponse } from '../models/response';

const log = new Logger('ApiServiceLogger');

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private notify: NotificationService) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(path, { params })
      .pipe(catchError(error => {
          this.notify.onError("There was an error while receiving data!");
          log.error('Response error', error.status + error.message);
          this.formatErrors(error);
          return of(null);
        }));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      path,
      JSON.stringify(body))
      .pipe(
        catchError(error => {
          this.notify.onError("There was an error while updating data!");
          log.error('Response error', error.status + error.message);
          this.formatErrors(error);
          return of(null);
        })
      );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      path,
      body)
      .pipe(
        catchError(error => {
          this.notify.onError(error);
          this.formatErrors(error);
          return of(null);
        })
      );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(path)
      .pipe(
        catchError(error => {
          this.notify.onError("There was an error while deleting data!");
          log.error('Response error', error.status + error.message);
          this.formatErrors(error);
          return of(null);
        })
      );
  }
}
