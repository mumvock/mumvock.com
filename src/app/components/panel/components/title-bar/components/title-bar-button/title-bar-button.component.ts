import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'button[titleBarButton]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./title-bar-button.component.scss'],
})
export class TitleBarButtonComponent {
    constructor(public readonly elementRef: ElementRef<HTMLButtonElement>) {}
}
