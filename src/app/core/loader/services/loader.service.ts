import { DOCUMENT } from '@angular/common';
import {
    ApplicationRef,
    ComponentRef,
    EnvironmentInjector,
    Inject,
    Injectable,
    RendererFactory2,
    createComponent,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { LoaderComponent } from '../loader.component';

@Injectable()
export class LoaderService {
    public static loading = 0;
    private static _loaderComponentRef:
        | ComponentRef<LoaderComponent>
        | undefined;
    private _renderer = inject(RendererFactory2).createRenderer(null, null);
    public readonly isLoading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly _applicationRef: ApplicationRef,
        private readonly _environmentInjector: EnvironmentInjector,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {
        this._manageLazyLoadingLoader();
    }

    private _manageLazyLoadingLoader(): void {
        inject(Router).events
            .pipe(takeUntilDestroyed())
            .subscribe((event) => {

                if (event instanceof RouteConfigLoadStart) {
                    this.loadStarted();
                }

                if (event instanceof RouteConfigLoadEnd) {
                    this.loadCompleted();
                }
        });
    }

    public loadStarted(): void {
        LoaderService.loading++;
        this._checkLoading();
    }

    public loadCompleted(): void {
        if (LoaderService.loading) {
            LoaderService.loading--;
        }

        this._checkLoading();
    }

    private _checkLoading(): void {

        if (LoaderService.loading) {
            this.isLoading$.next(true);
            setTimeout(() => this._createLoaderComponent(), 150);
        } else {
            this.isLoading$.next(false);
            setTimeout(() => this._destroyLoaderComponent(), 150);
        }

    }

    private _createLoaderComponent(): void {

        if (
            LoaderService._loaderComponentRef
            || !LoaderService.loading
        ) {
            return;
        }

        const loaderComponentRef = (LoaderService._loaderComponentRef =
            createComponent(LoaderComponent, {
                environmentInjector: this._environmentInjector,
            }));

        this._renderer.appendChild(
            this._document?.body,
            loaderComponentRef.location.nativeElement
        );

        this._applicationRef.attachView(loaderComponentRef.hostView);
    }

    private _destroyLoaderComponent(): void {

        if (
            !LoaderService._loaderComponentRef
            || LoaderService.loading
        ) {
            return;
        }

        LoaderService._loaderComponentRef.destroy();
        this._applicationRef.detachView(LoaderService._loaderComponentRef.hostView);
        LoaderService._loaderComponentRef = undefined;
    }
}
