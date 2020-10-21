import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorLoginService implements HttpInterceptor {

  constructor( private router: Router) { }

  intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      'x-token': token
    });

    // me clono la request y mando el headers
    const reqClone = req.clone({
      headers
    });

    return next.handle( reqClone)
               .pipe(
                       catchError((err: HttpErrorResponse) => {

                        if (err.status === 401) {
                          this.router.navigateByUrl('/login');
                        }
                        return throwError( err );
                      }
                    )
               );

  }
}
