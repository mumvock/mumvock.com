import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThumbnailComponent } from '../../thumbnail.component';
import { ThumbnailImgComponent } from '../thumbnail-img/thumbnail-img.component';
import { ImageLoaderDirective } from './../../../../core/loader/directives/image-loader/image-loader.directive';
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
    imports: [CommonModule, ImageLoaderDirective],
})
export class ThumbnailContainerModule {}
