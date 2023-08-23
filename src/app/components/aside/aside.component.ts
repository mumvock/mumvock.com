import { Component } from '@angular/core';

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
})
export class AsideComponent {
    private _audios: Audios;

    constructor(private readonly _panelService: PanelService) {

        this._audios = {
            click: new Audio(environment.assets.sounds + 'buttonclickrelease.wav'),
            hover: new Audio(environment.assets.sounds + 'buttonrollover.wav'),
        };
        this._loadAudios();
    }

    public openPanel(alias: string): void {
        this.playSound(true);
        this._panelService.openPanel(alias);
    }

    public playSound(click?: boolean): void {
        this._audios[click ? 'click' : 'hover'].play();
    }

    private _loadAudios(): void {
        Object.values(this._audios).forEach((audioElement) => {
            audioElement.load();
        });
    }
}
