import { Component } from '@angular/core';

import { PAGES_ROUTES } from './pages-routing.module';

@Component({
    selector: 'pages-component',
    templateUrl: './pages.component.html',
})
export class PagesComponent {
    public readonly PAGES_ROUTES = PAGES_ROUTES;
}
