import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Inject,
    Injector,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    ViewChildren,
    effect,
    signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ImagesDetails } from '../../../../interfaces/thumbnail.interface';
import { ThumbnailComponent } from './../../../../../../components/thumbnail/thumbnail.component';
import { LoaderService } from './../../../../../../core/loader/services/loader.service';

@Component({
    selector: 'section[thumbnailOverlay]',
    templateUrl: './thumbnail-overlay.component.html',
    styleUrls: ['./thumbnail-overlay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailOverlayComponent implements OnInit, OnDestroy {
    @ViewChildren(ThumbnailComponent, { read: ElementRef })
    private readonly _thumbnails!: QueryList<ElementRef<HTMLElement>>;

    public readonly imagesDetails$$ = signal<Array<ImagesDetails>>([]);
    public readonly currentImgIndex$$ = signal<number>(0);
    public readonly closeOverlay$ = new EventEmitter<void>();

    private _grabPos = { top: 0, left: 0, x: 0, y: 0 };
    private _grabbing = false;

    private _mouseMoveListenDestroyer!: () => void;
    private _mouseUpListenDestroyer!: () => void;
    private _keyDownListenDestroyer!: () => void;

    constructor(
        private readonly _renderer: Renderer2,
        private readonly _loaderService: LoaderService,
        private readonly _destroyRef: DestroyRef,
        private readonly _injector: Injector,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {}

    public ngOnInit(): void {
        this._listenLoader();
        this._scrollToCurrentImg();
    }

    public ngOnDestroy(): void {
        this._mouseMoveListenDestroyer && this._mouseMoveListenDestroyer();
        this._mouseUpListenDestroyer && this._mouseUpListenDestroyer();
        this._keyDownListenDestroyer && this._keyDownListenDestroyer();
    }

    private _scrollToCurrentImg(): void {
        effect(() => {
            this._thumbnails
                .get(this.currentImgIndex$$())?.nativeElement
                .scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });

        }, { injector: this._injector });
    }

    private _listenLoader(): void {
        this._loaderService.isLoading$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((status) =>
                status ? this._stopListenArrowKeys() : this._listenArrowKeys()
            );
    }

    protected changeImage(thumbnailIndex: number): void {
        if (this._grabbing) return;

        this.currentImgIndex$$.set(thumbnailIndex);
    }

    protected closeOverlay(): void {
        this.closeOverlay$.emit();
        this.closeOverlay$.complete();
    }

    private _listenArrowKeys(): void {
        this._keyDownListenDestroyer = this._renderer.listen(
            this._document,
            'keydown',
            (event: KeyboardEvent) => this._onKeyDown(event)
        );
    }

    private _stopListenArrowKeys(): void {
        this._keyDownListenDestroyer && this._keyDownListenDestroyer();
    }

    private _onKeyDown(event: KeyboardEvent): void {
        const previousImage = (): void => {

            if (
                this.currentImgIndex$$() === undefined ||
                this.currentImgIndex$$() === 0
            ) {
                return;
            }

            this.currentImgIndex$$.update((currentImgIndex) => currentImgIndex - 1);
        };

        const nextImage = (): void => {

            if (
                this.currentImgIndex$$() === undefined ||
                this.currentImgIndex$$() === this.imagesDetails$$().length - 1
            ) {
                return;
            }

            this.currentImgIndex$$.update((currentImgIndex) => currentImgIndex + 1);
        };

        if (event.key == 'ArrowLeft') {
            // Left arrow
            previousImage();
        }

        if (event.key == 'ArrowRight') {
            // Right arrow
            nextImage();
        }
    }

    protected mouseDownHandler(div: HTMLDivElement, event: MouseEvent): void {
        this._grabbing = true;
        this._mouseMoveListenDestroyer && this._mouseMoveListenDestroyer();
        this._mouseUpListenDestroyer && this._mouseUpListenDestroyer();

        // Change the cursor
        this._renderer.setStyle(div, 'cursor', 'grabbing');

        this._grabPos = {
            // The current scroll
            left: div.scrollLeft,
            top: div.scrollTop,
            // Get the current mouse position
            x: event.clientX,
            y: event.clientY,
        };

        this._mouseMoveListenDestroyer = this._renderer.listen(
            div,
            'mousemove',
            (event: MouseEvent) => this._mouseMoveHandler(div, event)
        );
        this._mouseUpListenDestroyer = this._renderer.listen(
            div,
            'mouseup',
            () => this._mouseUpHandler(div)
        );
    }

    private _mouseMoveHandler(div: HTMLDivElement, event: MouseEvent): void {
        // How far the mouse has been moved
        const dx = event.clientX - this._grabPos.x;
        const dy = event.clientY - this._grabPos.y;

        // Scroll the element
        div.scrollTop = this._grabPos.top - dy;
        div.scrollLeft = this._grabPos.left - dx;
    }

    private _mouseUpHandler(div: HTMLDivElement) {
        this._mouseMoveListenDestroyer && this._mouseMoveListenDestroyer();
        this._mouseUpListenDestroyer && this._mouseUpListenDestroyer();
        this._renderer.setStyle(div, 'cursor', 'grab');

        setTimeout(() => {
            this._grabbing = false;
        }, 100);
    }
}
