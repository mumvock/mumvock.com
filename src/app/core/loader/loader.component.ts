import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'div[loader]',
    template: `<p>LOADING...</p>`,
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {}
