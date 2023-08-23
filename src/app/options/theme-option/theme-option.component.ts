import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';

import { environment } from './../../../environments/environment';
import { THEME_STORAGE_KEY } from './services/theme.service';

declare interface Themes {
    class: THEMES_CLASS;
    imgSrc: string;
    name: string;
}

enum THEMES_CLASS {
    mumvockTheme = 'mumvock-theme',
    valveTheme = 'valve-theme',
};

@Component({
    selector: 'section[theme]',
    templateUrl: './theme-option.component.html',
    styleUrls: ['./theme-option.component.scss'],
})
export class ThemeOptionComponent {
    public readonly themes: Array<Themes>;

    constructor(
        private readonly _renderer: Renderer2,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {
        const { images } = environment.assets;

        this.themes = [
            {
                class: THEMES_CLASS.mumvockTheme,
                imgSrc: images + 'themes/mumvock_theme.jpg',
                name: 'Mumvock Theme'
            },
            {
                class: THEMES_CLASS.valveTheme,
                imgSrc: images + 'themes/valve_theme.jpg',
                name: 'Valve Theme'
            }
        ];
    }

    public changeTheme(themeClass: THEMES_CLASS) {
        Object.values(THEMES_CLASS).forEach((themeName) =>
            this._renderer.removeClass(this._document.body, themeName)
        );

        this._renderer.addClass(this._document.body, themeClass);
        localStorage.setItem(THEME_STORAGE_KEY, themeClass);
    }
}
