import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThumbnailModule } from './../../components/thumbnail/thumbnail.module';
import { AboutRoutingModule } from './about-routing.module';

import { AboutComponent } from './about.component';
import { PlaceholderImgDirective } from './../../components/placeholder-img/placeholder-img.directive';

@NgModule({
    declarations: [AboutComponent],
    imports: [
        CommonModule,
        AboutRoutingModule,
        ClipboardModule,
        ThumbnailModule,
        PlaceholderImgDirective
    ],
})
export class AboutModule {}
