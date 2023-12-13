import { ChangeDetectionStrategy, Component } from '@angular/core';

import { APP_ROUTES } from './../app-routing.module';
import { PAGES_ROUTES } from './pages-routing.module';

@Component({
    selector: 'pages-component',
    templateUrl: './pages.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesComponent {
    protected readonly APP_ROUTES = APP_ROUTES;
    protected readonly PAGES_ROUTES = PAGES_ROUTES;
}
