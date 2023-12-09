import { Injectable, inject } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private readonly _loaderService = inject(LoaderService);

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        this._loaderService.loadStarted();

        return next
            .handle(request)
            .pipe(finalize(() => this._loaderService.loadCompleted()));
    }
}
