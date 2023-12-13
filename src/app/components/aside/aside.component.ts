import { ChangeDetectionStrategy, Component } from '@angular/core';

import { APP_ROUTES } from './../../app-routing.module';

import { environment } from './../../../environments/environment';
import { PanelService } from './../panel/services/panel.service';

declare interface Audios {
    click: HTMLAudioElement;
    hover: HTMLAudioElement;
};

@Component({
    selector: 'aside[aside]',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent {
    protected readonly APP_ROUTES = APP_ROUTES;
    private readonly _audios: Audios;

    constructor(private readonly _panelService: PanelService) {
        this._audios = {
            click: new Audio(environment.assets.sounds + 'buttonclickrelease.wav'),
            hover: new Audio(environment.assets.sounds + 'buttonrollover.wav'),
        };

        this._loadAudios();
    }

    protected openPanel(alias: APP_ROUTES): void {
        this.playSound(true);
        this._panelService.openPanel(alias);
    }

    protected playSound(click?: boolean): void {
        this._audios[click ? 'click' : 'hover'].play();
    }

    private _loadAudios(): void {
        Object.values(this._audios).forEach((audioElement) => {
            audioElement.load();
        });
    }
}
