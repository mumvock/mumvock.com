import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ThemeService } from './options/theme-option/services/theme.service';

@Component({
    selector: '[root]',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private readonly _router = inject(Router);
    private readonly _themeService = inject(ThemeService);

    public ngOnInit(): void {
        this._manageInitialRoute();
        this._themeService.loadTheme();
    }

    private _manageInitialRoute(): void {
        const { pathname } = window?.location;

        // initial route
        if (pathname === '/') {
            this._router.navigate([{ outlets: { pages: 'pages' } }]);

            return;
        }

        // 404
        if (pathname.length > 1 && !pathname.includes('(pages:')) {
            this._router.navigate([{ outlets: { pages: 'pages' } }]);
        }
    }
}
