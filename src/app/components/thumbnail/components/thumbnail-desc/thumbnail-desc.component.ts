import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'figcaption[thumbnailDesc]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./thumbnail-desc.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailDescComponent {}
