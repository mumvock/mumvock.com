import {
    AfterContentInit,
    ApplicationRef,
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
import { DOCUMENT } from '@angular/common';

import { ImagesDetails } from '../../interfaces/thumbnail.interface';
import { ThumbnailComponent } from '../../thumbnail.component';
import { ThumbnailOverlayComponent } from './components/thumbnail-overlay/thumbnail-overlay.component';
import { first } from 'rxjs';

@Component({
    selector: 'div[thumbnailContainer]',
    template: `
        <div #expandContainerElement><ng-content></ng-content></div>
        <button
            *ngIf="!expanded"
            type="button"
            (click)="expandContainer()"
            title="Clique para ver todos"
        >
            Ver todos
        </button>
    `,
    styleUrls: ['./thumbnail-container.component.scss'],
})
export class ThumbnailContainerComponent
    implements OnDestroy, AfterContentInit
{
    @Input()
    public imagesDetails!: Array<ImagesDetails>;

    @ContentChildren(ThumbnailComponent)
    private _thumbnails!: QueryList<ThumbnailComponent> | undefined;

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

    public expandContainer(): void {
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
            const thumbnailElement = thumbnail.elementRef.nativeElement;
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

        overlayComponentRef.instance.currentImgIndex = clickedThumbnailIndex;
        overlayComponentRef.instance.imagesDetails = this.imagesDetails;
        overlayComponentRef.instance.$closeOverlay
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
