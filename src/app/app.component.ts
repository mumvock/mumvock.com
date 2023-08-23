import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { LoaderService } from './core/components/loader/services/loader.service';
import { ThemeService } from './options/theme-option/services/theme.service';
import { BaseComponent } from './utils/abstracts/base.components';

@Component({
  selector: '[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {

    constructor(
        private readonly _router: Router,
        private readonly _loaderService: LoaderService,
        private readonly _themeService: ThemeService,
    ) {
        super();
        this._manageLazyLoadingLoader();
    }

    public ngOnInit(): void {
        this._manageInitialRoute();
        this._themeService.loadTheme();
    }

    private _manageLazyLoadingLoader(): void {
        this._router.events
            .pipe(takeUntil(this.$onDestroy))
            .subscribe(event => {

                if (event instanceof RouteConfigLoadStart) {
                    this._loaderService.loadStarted();
                }

                if (event instanceof RouteConfigLoadEnd) {
                    this._loaderService.loadCompleted();
                }
            });
    }

    private _manageInitialRoute(): void {
        const { pathname } = window?.location;

        // initial route
        if (pathname === '/') {
            this._router.navigate([{ outlets: { pages: 'pages' }}]);

            return;
        }

        // 404
        if (pathname.length > 1 && !pathname.includes('(pages:')) {
            this._router.navigate([{ outlets: { pages: 'pages' }}]);
        }
    }
}
