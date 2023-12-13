import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from './../../../environments/environment';

@Component({
    selector: 'header[header]',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    protected readonly img: { alt: string; srcLogo: string, srcWhite: string };
    protected readonly slogan: string;

    constructor() {
        const { websiteUrl, srcLogo, srcWhiteLogo, slogan } = environment.identity;

        this.img = {
            alt: 'Logo ' + websiteUrl,
            srcLogo: srcLogo,
            srcWhite: srcWhiteLogo,
        };

        this.slogan = slogan;
    }
}
