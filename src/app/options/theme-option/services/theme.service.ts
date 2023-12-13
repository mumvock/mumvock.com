import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RendererFactory2, inject, signal } from '@angular/core';

import { THEMES_CLASS } from '../interfaces/themes.interface';

const THEME_STORAGE_KEY = 'theme';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly _renderer = inject(RendererFactory2).createRenderer(null, null);

    private readonly _currentThemeClass$$ = signal<THEMES_CLASS>(THEMES_CLASS['mumvock-theme']);
    public readonly currentThemeClass$$ = this._currentThemeClass$$.asReadonly();

    constructor(
        @Inject(DOCUMENT) private readonly _document: Document
    ) {}

    public loadTheme(): void {
        const recoveredThemeClass = localStorage.getItem(THEME_STORAGE_KEY);
        const themeClass = Object.values(THEMES_CLASS)
            .find((theme) => recoveredThemeClass === theme);

        if (themeClass) {
            this._renderer.addClass(this._document?.body, themeClass);
            this._currentThemeClass$$.set(themeClass);
        }
    };


    public changeTheme(themeClass: THEMES_CLASS): void {
        Object.values(THEMES_CLASS).forEach((themeName) =>
            this._renderer.removeClass(this._document?.body, themeName)
        );

        this._renderer.addClass(this._document?.body, themeClass);
        localStorage.setItem(THEME_STORAGE_KEY, themeClass);
        this._currentThemeClass$$.set(themeClass);
    }
}
