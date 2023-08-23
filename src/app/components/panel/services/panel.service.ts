import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { Panels } from './../interfaces/panel.interface';

@Injectable({
    providedIn: 'root',
})
export class PanelService {
    /**
     * DO NOT RE-ASSIGN!
     */
    public panels: Panels = {};
    private _renderer: Renderer2;

    constructor(
        private readonly _router: Router,
        private readonly _rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {
        this._renderer = _rendererFactory.createRenderer(null, null);
    }

    public maximizePanel(alias: string): void {
        if (!this._checkAliasRegister(alias)) return;

        const { position, size } = this.panels[alias];

        if (size.$current.getValue()?.width === '100%') {
            // Already maximized
            position.$current.next(position.previous || position.default);
            size.$current.next(size.previous || size.default);
        } else {
            const panelElement =
                this._document?.body?.querySelector<HTMLDivElement>(
                    `div[panel][alias=${alias}]`
                );

            if (panelElement) {
                const { x, y, width, height } =
                    panelElement.getBoundingClientRect();
                position.previous = { x, y };
                size.previous = { width: width + 'px', height: height + 'px' };
            }

            position.$current.next({ x: 0, y: 0 });
            size.$current.next({ width: '100%', height: '100%' });
        }
    }

    public closePanel(alias: string): void {
        if (!this._checkAliasRegister(alias)) return;

        const { position, size } = this.panels[alias];
        position.$current.next(position.default);
        size.$current.next(size.default);

        this._router.navigate([{ outlets: { [alias]: null } }]);
    }

    public openPanel(alias: string): void {
        this._router.navigate([{ outlets: { [alias]: alias } }]);
        this.managePanelsZIndex(alias);
    }

    public managePanelsZIndex(alias: string): void {
        Object.keys(this.panels).forEach((otherPanelAlias) => {

            if (otherPanelAlias !== alias) {
                const otherPanelElement =
                    this._document?.body?.querySelector<HTMLDivElement>(
                        `div[panel][alias=${otherPanelAlias}]`
                    );

                if (otherPanelElement) {
                    this._renderer.setStyle(otherPanelElement, 'zIndex', '1');
                    this._renderer.removeStyle(otherPanelElement, 'box-shadow');
                }

            } else {
                const clickedPanelElement =
                    this._document?.body?.querySelector<HTMLDivElement>(
                        `div[panel][alias=${alias}]`
                    );

                if (!clickedPanelElement) return;

                this._renderer.setStyle(clickedPanelElement, 'zIndex', '2');
                this._renderer.setStyle(
                    clickedPanelElement,
                    'box-shadow',
                    'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
                );
            }
        });
    }

    private _checkAliasRegister(alias: string): boolean {
        if (!this.panels[alias]) {
            console.error(`PanelService: alias not registered.`);

            return false;
        }

        return true;
    }
}
