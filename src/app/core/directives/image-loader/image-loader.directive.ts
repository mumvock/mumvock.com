import { Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { LoaderService } from '../../components/loader/services/loader.service';

@Directive({
    selector: '[imageLoader]',
})
export class ImageLoaderDirective implements OnDestroy {
    private _imgLoadListenDestroyer!: () => void;
    private _imgErrorListenDestroyer!: () => void;
    private _loaderStarted = false;

    @Input()
    public set src(path: string) {

        if (this._loaderStarted) {
            this._loadCompleted();
        }

        this._loaderStarted = true;
        this._loaderService.loadStarted();
        this._startListeners();
        this._elementRef.nativeElement.src = path;
    }

    constructor(
        private readonly _elementRef: ElementRef<HTMLImageElement>,
        private readonly _renderer: Renderer2,
        private readonly _loaderService: LoaderService
    ) {}

    public ngOnDestroy(): void {
        this._imgLoadListenDestroyer && this._imgLoadListenDestroyer();
        this._imgErrorListenDestroyer && this._imgErrorListenDestroyer();
    }

    private _startListeners(): void {
        this._imgLoadListenDestroyer = this._renderer.listen(
            this._elementRef.nativeElement,
            'load',
            () => this._loadCompleted()
        );

        this._imgErrorListenDestroyer = this._renderer.listen(
            this._elementRef.nativeElement,
            'error',
            () => this._loadCompleted()
        );
    }

    private _loadCompleted(): void {
        this._loaderStarted = false;
        this._loaderService.loadCompleted();
        this._imgLoadListenDestroyer && this._imgLoadListenDestroyer();
        this._imgErrorListenDestroyer && this._imgErrorListenDestroyer();
    }
}
