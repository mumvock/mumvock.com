import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThumbnailModule } from './../../components/thumbnail/thumbnail.module';
import { ThemeOptionRoutingModule } from './theme-option-routing.module';

import { ImageLoaderDirective } from './../../core/loader/directives/image-loader/image-loader.directive';
import { ThemeOptionComponent } from './theme-option.component';

@NgModule({
    declarations: [ThemeOptionComponent],
    imports: [
        CommonModule,
        ThemeOptionRoutingModule,
        ThumbnailModule,
        ImageLoaderDirective,
    ],
})
export class ThemeOptionModule {}
