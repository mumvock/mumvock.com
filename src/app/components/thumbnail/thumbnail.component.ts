import {
    AfterContentInit,
    Component,
    ContentChild,
    ElementRef,
    Renderer2,
} from '@angular/core';

import { ThumbnailImgComponent } from './components/thumbnail-img/thumbnail-img.component';

@Component({
    selector: 'figure[thumbnail]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent implements AfterContentInit {
    @ContentChild(ThumbnailImgComponent, { read: ElementRef<HTMLImageElement> })
    public thumbnailImg!: ElementRef<HTMLImageElement> | undefined;

    constructor(
        public readonly elementRef: ElementRef<HTMLPictureElement>,
        private readonly _renderer: Renderer2
    ) {}

    public ngAfterContentInit(): void {
        if (!this.thumbnailImg) return;

        this._renderer.setStyle(
            this.thumbnailImg?.nativeElement,
            'width',
            '200px'
        );
        this._renderer.setStyle(
            this.thumbnailImg?.nativeElement,
            'height',
            '150px'
        );
    }
}
