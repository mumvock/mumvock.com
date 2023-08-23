import { Component } from '@angular/core';

@Component({
    selector: 'img[thumbnailImg]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./thumbnail-img.component.scss'],
})
export class ThumbnailImgComponent {}
