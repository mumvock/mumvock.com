import { Component } from '@angular/core';

@Component({
    selector: 'div[container]',
    template: `<div><ng-content></ng-content><div>`,
    styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
}
