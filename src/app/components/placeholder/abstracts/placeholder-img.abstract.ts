import { Component, ElementRef, Input, OnDestroy, Renderer2, inject } from '@angular/core';

@Component({
    template: '',
})
export abstract class PlaceholderImg implements OnDestroy {
    protected readonly elementRef: ElementRef<HTMLImageElement> = inject(ElementRef<HTMLImageElement>);
    protected readonly _renderer = inject(Renderer2);

    @Input()
    public set src(path: string) {

        if (this.loaderStarted) { // ver se é necessário
            this._loadCompleted();
        }

        this._loadStarted();
        this.elementRef.nativeElement.src = path;
    }

    private _imgLoadListenDestroyer!: () => void;
    private _imgErrorListenDestroyer!: () => void;
    protected loaderStarted = false;

    public ngOnDestroy(): void {
        this._imgLoadListenDestroyer && this._imgLoadListenDestroyer();
        this._imgErrorListenDestroyer && this._imgErrorListenDestroyer();
    }

    private _startListeners(): void {
        this._imgLoadListenDestroyer = this._renderer.listen(
            this.elementRef.nativeElement,
            'load',
            () => this._loadCompleted()
        );

        this._imgErrorListenDestroyer = this._renderer.listen(
            this.elementRef.nativeElement,
            'error',
            () => this._loadCompleted()
        );
    }

    private _loadStarted(): void {
        this.loaderStarted = true;
        this._startListeners();
        this._setPlaceholder();
    }

    private _loadCompleted(): void {
        this.loaderStarted = false;
        this._removePlaceholder();
        this._imgLoadListenDestroyer && this._imgLoadListenDestroyer();
        this._imgErrorListenDestroyer && this._imgErrorListenDestroyer();
    }

    private _setPlaceholder(): void {
        this._renderer.addClass(
            this.elementRef.nativeElement,
            'placeholder-img'
        );
    }

    private _removePlaceholder(): void {
        this._renderer.removeClass(
            this.elementRef.nativeElement,
            'placeholder-img'
        );
    }

}
