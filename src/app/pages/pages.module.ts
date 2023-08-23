import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PanelModule } from './../components/panel/panel.module';
import { SharedDirectivesModule } from '../core/directives/shared-directives.module';

import { PagesComponent } from './pages.component';

@NgModule({
    declarations: [PagesComponent],
    imports: [CommonModule, PagesRoutingModule, PanelModule, SharedDirectivesModule],
    exports: [PagesComponent]
})
export class PagesModule {}
