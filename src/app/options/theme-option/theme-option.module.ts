import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeOptionRoutingModule } from './theme-option-routing.module';
import { ThumbnailModule } from 'src/app/components/thumbnail/thumbnail.module';

import { ThemeOptionComponent } from './theme-option.component';

@NgModule({
    declarations: [ThemeOptionComponent],
    imports: [CommonModule, ThemeOptionRoutingModule, ThumbnailModule],
})
export class ThemeOptionModule {}
