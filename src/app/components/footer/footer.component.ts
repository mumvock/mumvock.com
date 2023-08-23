import { Component } from '@angular/core';

import { environment } from './../../../environments/environment';

@Component({
    selector: 'footer[footer]',
    template: `
        <small class="text-body-secondary">
            Feito com <span title="amor">&#10084;</span> por
            <a href="https://github.com/mumvock" target="_blank">Mumvock</a> &#8212;
            <i>
                <time datetime="2023">
                    2023
                </time>
            </i>
        </small><br>
        <small class="text-body-secondary">
            v{{ version }} &#8212; Counter-Strike and its identities contained on
            this website &#169; Valve Corporation.
        </small>
    `,
    styleUrls: ['./footer.component.scss'],
    standalone: true,
})
export class FooterComponent {
    public version: string;

    constructor() {
        this.version = environment.version;
    }
}
