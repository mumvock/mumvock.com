import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageLoaderDirective } from './image-loader/image-loader.directive';

@NgModule({
    declarations: [ImageLoaderDirective],
    imports: [CommonModule],
    exports: [ImageLoaderDirective],
})
export class SharedDirectivesModule {}
