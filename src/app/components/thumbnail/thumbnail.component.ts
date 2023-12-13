import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'figure[thumbnail]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./thumbnail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailComponent {}
