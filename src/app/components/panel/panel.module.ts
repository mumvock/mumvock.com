import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TitleBarModule } from './components/title-bar/title-bar.module';
import { NavModule } from './components/nav/nav.module';

import { PanelComponent } from './panel.component';
import { ContainerComponent } from './components/container/container.component';

@NgModule({
    declarations: [PanelComponent, ContainerComponent],
    exports: [TitleBarModule, NavModule, PanelComponent, ContainerComponent],
    imports: [CommonModule, DragDropModule, TitleBarModule, NavModule],
})
export class PanelModule {}
