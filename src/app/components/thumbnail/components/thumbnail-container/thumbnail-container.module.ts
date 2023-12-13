import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThumbnailComponent } from '../../thumbnail.component';
import { ThumbnailImgComponent } from '../thumbnail-img/thumbnail-img.component';
import { ThumbnailOverlayComponent } from './components/thumbnail-overlay/thumbnail-overlay.component';
import { ThumbnailContainerComponent } from './thumbnail-container.component';

@NgModule({
    declarations: [
        ThumbnailContainerComponent,
        ThumbnailOverlayComponent,
        ThumbnailComponent,
        ThumbnailImgComponent,
    ],
    exports: [
        ThumbnailContainerComponent,
        ThumbnailComponent,
        ThumbnailImgComponent,
    ],
    imports: [CommonModule],
})
export class ThumbnailContainerModule {}
