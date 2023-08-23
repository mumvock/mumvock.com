import { Component } from '@angular/core';

import { OPTIONS_ROUTES } from './options-routing.module';

@Component({
    selector: 'options-component',
    templateUrl: './options.component.html',
})
export class OptionsComponent {
    public readonly OPTIONS_ROUTES = OPTIONS_ROUTES;
}
