import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

@Component({
    selector: 'button[titleBarButton]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./title-bar-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarButtonComponent {
    constructor(public readonly elementRef: ElementRef<HTMLButtonElement>) {}
}
