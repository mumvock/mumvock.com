import { Component } from '@angular/core';

@Component({
    selector: 'a[navListAnchor]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./nav-list-anchor.component.scss'],
})
export class NavListAnchorComponent {
}
