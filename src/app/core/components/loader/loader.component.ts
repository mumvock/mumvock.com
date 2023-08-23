import { Component } from '@angular/core';

@Component({
    selector: 'div[loader]',
    template: `<p>LOADING...</p>`,
    styleUrls: ['./loader.component.scss'],
    standalone: true,
})
export class LoaderComponent {
}
