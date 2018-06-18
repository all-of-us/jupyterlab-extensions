/*Intercepts all HTTP request */

import {Injectable} from '@angular/core';
import {ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs,
  Response} from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import {ErrorHandlingService} from '../services/error-handling.service';

@Injectable()
export class InterceptedHttp extends Http {
  private shouldCheckStatus = new Subject<boolean>();
  public shouldCheckStatus$ = this.shouldCheckStatus.asObservable();
  public shouldPingStatus = true;


  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,
      private errorHandlingService: ErrorHandlingService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.errorHandlingService.retryApi(
        super.request(url, options)).catch((e) => {
          e.xhrError = true;
          if ((e.status === 500 || e.status === 503) &&
              this.shouldPingStatus) {
            this.shouldCheckStatus.next(true);
          }
          throw e;
        });
  }
}
