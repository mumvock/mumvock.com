import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { AboutRoutingModule } from './about-routing.module';
import { SharedDirectivesModule } from './../../core/directives/shared-directives.module';

import { AboutComponent } from './about.component';
import { ThumbnailModule } from './../../components/thumbnail/thumbnail.module';

@NgModule({
    declarations: [AboutComponent],
    imports: [
        CommonModule,
        AboutRoutingModule,
        ClipboardModule,
        ThumbnailModule,
        SharedDirectivesModule
    ],
})
export class AboutModule {}
