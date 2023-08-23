import {
    ApplicationRef,
    ComponentRef,
    EnvironmentInjector,
    Inject,
    Injectable,
    Renderer2,
    RendererFactory2,
    createComponent,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { LoaderComponent } from '../loader.component';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    public static loading = 0;
    private static _loaderComponentRef:
        | ComponentRef<LoaderComponent>
        | undefined;
    private _renderer: Renderer2;
    public readonly $isLoading = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly _applicationRef: ApplicationRef,
        private readonly _environmentInjector: EnvironmentInjector,
        private readonly _rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {
        this._renderer = _rendererFactory.createRenderer(null, null);
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
            this.$isLoading.next(true);
            setTimeout(() => this._createLoaderComponent(), 150);
        } else {
            this.$isLoading.next(false);
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
