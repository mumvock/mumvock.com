import { Component } from '@angular/core';

@Component({
    selector: 'figcaption[thumbnailDesc]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./thumbnail-desc.component.scss'],
})
export class ThumbnailDescComponent {

    constructor() {}
}
