import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PanelModule } from './../components/panel/panel.module';
import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';

@NgModule({
    declarations: [PagesComponent],
    imports: [CommonModule, PagesRoutingModule, PanelModule],
    exports: [PagesComponent]
})
export class PagesModule {}
