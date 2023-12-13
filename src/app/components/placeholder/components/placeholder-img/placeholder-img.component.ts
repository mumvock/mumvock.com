import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PlaceholderImg } from '../../abstracts/placeholder-img.abstract';

@Component({
    selector: 'div[placeholderImg]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./placeholder-img.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderImgComponent extends PlaceholderImg {}

