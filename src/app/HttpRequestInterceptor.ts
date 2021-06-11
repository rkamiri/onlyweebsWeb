import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true,
        });
        return next.handle(req).pipe(
            tap(
                () => {},
                (error: any) => {
                    if (
                        error instanceof
                        HttpErrorResponse /*&& this.router.url !== '/login'*/
                    ) {
                        const url = this.router.url;
                        if (error.status === 404) {
                            this.router.navigate(['/not-found']).then();
                        } else if (error.status === 403 && url !== '/login') {
                            this.router.navigate(['/forbidden']).then();
                        } else if (error.status === 401) {
                            this.router.navigate(['/unauthorized']).then();
                        } else if (error.status === 500) {
                            this.router.navigate(['/server-error']).then();
                        } else {
                            return;
                        }
                    }
                }
            )
        );
    }
}
