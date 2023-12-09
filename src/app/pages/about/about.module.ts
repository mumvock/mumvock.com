import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AboutRoutingModule } from './about-routing.module';

import { ThumbnailModule } from './../../components/thumbnail/thumbnail.module';
import { ImageLoaderDirective } from './../../core/loader/directives/image-loader/image-loader.directive';
import { AboutComponent } from './about.component';

@NgModule({
    declarations: [AboutComponent],
    imports: [
        CommonModule,
        AboutRoutingModule,
        ImageLoaderDirective,
        ClipboardModule,
        ThumbnailModule,
    ],
})
export class AboutModule {}
