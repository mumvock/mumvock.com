import { Component, ElementRef, Input } from '@angular/core';

import { PanelService } from '../../services/panel.service';

@Component({
    selector: 'div[titleBar]',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent {
    public alias!: string;

    @Input()
    public maximizeButton?: boolean;

    constructor(
        public readonly elementRef: ElementRef<HTMLButtonElement>,
        public readonly panelService: PanelService
    ) {}

    public getMaximizeButtonTitle(): string {
        const defaultTitle = 'Maximizar';

        if (
            !this.alias
            || !this.panelService.panels[this.alias]
        ) {
            return defaultTitle;
        }

        const currentPanelSize =
            this.panelService.panels[this.alias].size.current$.getValue();

        return (currentPanelSize.width !== '100%'
            ? 'Maximizar'
            : 'Minimizar');
    }
}
