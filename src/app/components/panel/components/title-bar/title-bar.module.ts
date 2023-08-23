import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleBarComponent } from './title-bar.component';
import { TitleBarButtonComponent } from './components/title-bar-button/title-bar-button.component';


@NgModule({
    declarations: [TitleBarComponent, TitleBarButtonComponent],
    exports: [TitleBarComponent, TitleBarButtonComponent],
    imports: [CommonModule],
})
export class TitleBarModule {}
