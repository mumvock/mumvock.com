import { DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    ApplicationRef,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    ContentChildren,
    ElementRef,
    EnvironmentInjector,
    Inject,
    Input,
    OnDestroy,
    QueryList,
    Renderer2,
    ViewChild,
    createComponent,
} from '@angular/core';

import { first } from 'rxjs';
import { ImagesDetails } from '../../interfaces/thumbnail.interface';
import { ThumbnailComponent } from '../../thumbnail.component';
import { ThumbnailOverlayComponent } from './components/thumbnail-overlay/thumbnail-overlay.component';

@Component({
    selector: 'div[thumbnailContainer]',
    template: `
        <div #expandContainerElement><ng-content></ng-content></div>
        @if (!expanded) {
            <button
                type="button"
                (click)="expandContainer()"
                title="Clique para ver todos">
                Ver todos
            </button>
        }
    `,
    styleUrls: ['./thumbnail-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailContainerComponent
    implements OnDestroy, AfterContentInit
{
    @Input()
    public imagesDetails!: Array<ImagesDetails>;

    @ContentChildren(ThumbnailComponent, { read: ElementRef })
    private _thumbnails!: QueryList<ElementRef<HTMLElement>> | undefined;

    @ViewChild('expandContainerElement')
    private _expandContainerElement!: ElementRef<HTMLDivElement>;

    private _overlayCreated = false;
    private _listenersDestroyer: Array<() => void> = [];
    public expanded = false;

    constructor(
        private readonly _renderer: Renderer2,
        private readonly _applicationRef: ApplicationRef,
        private readonly _environmentInjector: EnvironmentInjector,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {}

    public ngAfterContentInit(): void {
        this._listenThumbnailClick();
    }

    public ngOnDestroy(): void {
        this._listenersDestroyer.forEach(
            (destroyer) => destroyer && destroyer()
        );
    }

    protected expandContainer(): void {
        this._renderer.setStyle(
            this._expandContainerElement.nativeElement,
            'max-height',
            'unset'
        );

        this._expandContainerElement.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });

        this.expanded = true;
    }

    private _listenThumbnailClick(): void {
        if (!this._thumbnails) return;

        this._thumbnails.map((thumbnail, thumbnailIndex) => {
            const thumbnailElement = thumbnail.nativeElement;
            this._listenersDestroyer[thumbnailIndex] = this._renderer.listen(
                thumbnailElement,
                'click',
                () => this._createOverlayComponent(thumbnailIndex)
            );

            this._renderer.setStyle(thumbnailElement, 'cursor', 'pointer');
        });
    }

    private _createOverlayComponent(clickedThumbnailIndex: number): void {
        if (this._overlayCreated) return;

        this._overlayCreated = true;

        const overlayComponentRef = createComponent(ThumbnailOverlayComponent, {
            environmentInjector: this._environmentInjector,
        });

        overlayComponentRef.instance.currentImgIndex$$.set(clickedThumbnailIndex);
        overlayComponentRef.instance.imagesDetails$$.set(this.imagesDetails);
        overlayComponentRef.instance.closeOverlay$
            .pipe(first())
            .subscribe(() =>
                this._destroyOverlayComponent(overlayComponentRef)
            );

        this._renderer.appendChild(
            this._document?.body,
            overlayComponentRef.location.nativeElement
        );

        this._applicationRef.attachView(overlayComponentRef.hostView);
    }

    private _destroyOverlayComponent(
        componentRef: ComponentRef<ThumbnailOverlayComponent>
    ): void {
        componentRef.destroy();
        this._applicationRef.detachView(componentRef.hostView);
        this._overlayCreated = false;
    }
}
