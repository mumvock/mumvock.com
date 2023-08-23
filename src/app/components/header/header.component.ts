import { Component } from '@angular/core';

import { environment } from './../../../environments/environment';

@Component({
    selector: 'header[header]',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
})
export class HeaderComponent {
    public img: { alt: string; srcLogo: string, srcWhite: string };
    public slogan: string;

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
