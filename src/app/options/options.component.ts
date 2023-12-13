import { ChangeDetectionStrategy, Component } from '@angular/core';

import { APP_ROUTES } from './../app-routing.module';
import { OPTIONS_ROUTES } from './options-routing.module';

@Component({
    selector: 'options-component',
    templateUrl: './options.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsComponent {
    protected readonly APP_ROUTES = APP_ROUTES;
    protected readonly OPTIONS_ROUTES = OPTIONS_ROUTES;
}
