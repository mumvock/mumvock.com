import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const THEME_STORAGE_KEY = 'theme';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private _renderer: Renderer2;

    constructor(
        private readonly _rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {
        this._renderer = _rendererFactory.createRenderer(null, null);
    }

    public loadTheme(): void {
        const theme = localStorage.getItem(THEME_STORAGE_KEY);

        if (theme) {
            this._renderer.addClass(this._document.body, theme);
        }
    };
}
