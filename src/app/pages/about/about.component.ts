import { Component } from '@angular/core';

import { environment } from './../../../environments/environment';

import { MAPS_IMAGES } from './maps-thumbnail';

@Component({
    selector: 'main[about]',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
    public readonly ip: string;
    public readonly slogan: string;
    public readonly maps = MAPS_IMAGES;
    public readonly assetsImagesPath: string;

    constructor() {
        const { ip, slogan } = environment.identity;
        this.ip = ip;
        this.slogan = slogan;
        this.assetsImagesPath = environment.assets.images;
    }
}
