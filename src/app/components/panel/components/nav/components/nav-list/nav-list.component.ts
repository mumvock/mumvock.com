import { Component } from '@angular/core';

@Component({
    selector: 'ul[navList]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent {
}
