import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { environment } from './../../../environments/environment';
import { THEMES_CLASS, Themes } from './interfaces/themes.interface';
import { ThemeService } from './services/theme.service';

@Component({
    selector: 'section[theme]',
    templateUrl: './theme-option.component.html',
    styleUrls: ['./theme-option.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeOptionComponent {
    private readonly _themeService = inject(ThemeService);

    protected readonly themes: Array<Themes>;
    protected readonly currentThemeClass$$ = this._themeService.currentThemeClass$$;

    constructor() {
        const themesPath = `${environment.assets.images}themes/`;

        this.themes = [
            {
                class: THEMES_CLASS['mumvock-theme'],
                imgSrc: themesPath + 'mumvock_theme.jpg',
                name: 'Mumvock Theme'
            },
            {
                class: THEMES_CLASS['valve-theme'],
                imgSrc: themesPath + 'valve_theme.jpg',
                name: 'Valve Theme'
            }
        ];
    }

    protected changeTheme(themeClass: THEMES_CLASS): void {
        this._themeService.changeTheme(themeClass);
    }
}
