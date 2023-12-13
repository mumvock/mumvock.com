import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from './../../../environments/environment';

import { MAPS_IMAGES } from './maps-thumbnail';

@Component({
    selector: 'main[about]',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
    protected readonly ip: string;
    protected readonly slogan: string;
    protected readonly maps = MAPS_IMAGES;
    protected readonly assetsImagesPath: string;

    constructor() {
        const { ip, slogan } = environment.identity;
        this.ip = ip;
        this.slogan = slogan;
        this.assetsImagesPath = environment.assets.images;
    }
}
