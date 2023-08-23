import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThumbnailContainerModule } from './components/thumbnail-container/thumbnail-container.module';

import { ThumbnailDescComponent } from './components/thumbnail-desc/thumbnail-desc.component';

@NgModule({
    declarations: [ThumbnailDescComponent],
    exports: [ThumbnailDescComponent, ThumbnailContainerModule],
    imports: [CommonModule, ThumbnailContainerModule],
})
export class ThumbnailModule {}
