import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavComponent } from './nav.component';
import { NavListComponent } from './components/nav-list/nav-list.component';
import { NavListItemComponent } from './components/nav-list-item/nav-list-item.component';
import { NavListAnchorComponent } from './components/nav-list-anchor/nav-list-anchor.component';

@NgModule({
    declarations: [NavComponent, NavListComponent, NavListItemComponent, NavListAnchorComponent],
    exports: [NavComponent, NavListComponent, NavListItemComponent, NavListAnchorComponent],
    imports: [CommonModule],
})
export class NavModule {}
