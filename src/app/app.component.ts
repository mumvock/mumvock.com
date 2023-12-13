import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { APP_ROUTES } from './app-routing.module';

import { ThemeService } from './options/theme-option/services/theme.service';

@Component({
    selector: '[root]',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    private readonly _router        = inject(Router);
    private readonly _location      = inject(Location);
    private readonly _themeService  = inject(ThemeService);

    protected readonly APP_ROUTES   = APP_ROUTES;

    public ngOnInit(): void {
        this._manageInitialRoute();
        this._themeService.loadTheme();
    }

    private _manageInitialRoute(): void {
        const pathname = this._location.path();

        // initial route
        if (pathname === '' || pathname === '/') {
            this._router.navigate([
                { outlets: { [APP_ROUTES.pages]: APP_ROUTES.pages } }
            ]);

            return;
        }

        // 404
        if (pathname.length > 1 && !pathname.includes(`(${APP_ROUTES.pages}:`)) {
            this._router.navigate([
                { outlets: { [APP_ROUTES.pages]: APP_ROUTES.pages } }
            ]);
        }
    }
}
