import { Component } from '@angular/core';

@Component({
    selector: 'nav[nav]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
}
