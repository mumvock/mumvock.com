import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RendererFactory2, inject } from '@angular/core';

export const THEME_STORAGE_KEY = 'theme';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly _renderer = inject(RendererFactory2).createRenderer(null, null);

    constructor(
        @Inject(DOCUMENT) private readonly _document: Document
    ) {}

    public loadTheme(): void {
        const theme = localStorage.getItem(THEME_STORAGE_KEY);

        if (theme) {
            this._renderer.addClass(this._document.body, theme);
        }
    };
}
