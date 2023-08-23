import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NewsRoutingModule } from './news-routing.module';

import { NewsComponent } from './news.component';

@NgModule({
    declarations: [NewsComponent],
    imports: [CommonModule, NewsRoutingModule],
})
export class NewsModule {}
