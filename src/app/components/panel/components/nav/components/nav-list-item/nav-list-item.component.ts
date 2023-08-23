import { Component } from '@angular/core';

@Component({
    selector: 'li[navListItem]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./nav-list-item.component.scss'],
})
export class NavListItemComponent {
}
