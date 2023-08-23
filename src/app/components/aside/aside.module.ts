import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AsideComponent } from './aside.component';

@NgModule({
    declarations: [AsideComponent],
    exports: [AsideComponent],
    imports: [CommonModule, RouterModule],
})
export class AsideModule {}
