import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedDirectivesModule } from './../../../../core/directives/shared-directives.module';

import { ThumbnailContainerComponent } from './thumbnail-container.component';
import { ThumbnailOverlayComponent } from './components/thumbnail-overlay/thumbnail-overlay.component';
import { ThumbnailComponent } from '../../thumbnail.component';
import { ThumbnailImgComponent } from '../thumbnail-img/thumbnail-img.component';

@NgModule({
    declarations: [
        ThumbnailContainerComponent,
        ThumbnailOverlayComponent,
        ThumbnailComponent,
        ThumbnailImgComponent,
    ],
    exports: [
        ThumbnailContainerComponent,
        SharedDirectivesModule,
        ThumbnailComponent,
        ThumbnailImgComponent,
    ],
    imports: [CommonModule, SharedDirectivesModule],
})
export class ThumbnailContainerModule {}
