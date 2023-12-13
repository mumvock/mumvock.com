import { NgModule } from '@angular/core';

import { PlaceholderImgComponent } from './components/placeholder-img/placeholder-img.component';
import { PlaceholderComponent } from './placeholder.component';

@NgModule({
    declarations: [PlaceholderComponent, PlaceholderImgComponent],
    exports: [PlaceholderComponent, PlaceholderImgComponent],
})
export class PlaceholderModule {}
