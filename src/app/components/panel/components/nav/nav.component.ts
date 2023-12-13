import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nav[nav]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
}
