import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PlaceholderImg } from './../../../../components/placeholder/abstracts/placeholder-img.abstract';

@Component({
    selector: 'img[thumbnailImg]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./thumbnail-img.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailImgComponent extends PlaceholderImg {
    @Input()
    public set largeThumbnail(large: boolean | undefined) {

        if (large) {
            this._renderer.addClass(this.elementRef.nativeElement, 'large-thumbnail');
        }
    }
}
