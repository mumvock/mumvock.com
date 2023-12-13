import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'div[placeholder]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['placeholder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent {}
