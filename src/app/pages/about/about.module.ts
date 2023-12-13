import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlaceholderModule } from './../../components/placeholder/placeholder.module';
import { ThumbnailModule } from './../../components/thumbnail/thumbnail.module';
import { AboutRoutingModule } from './about-routing.module';

import { AboutComponent } from './about.component';

@NgModule({
    declarations: [AboutComponent],
    imports: [
        CommonModule,
        AboutRoutingModule,
        ClipboardModule,
        ThumbnailModule,
        PlaceholderModule
    ],
})
export class AboutModule {}
