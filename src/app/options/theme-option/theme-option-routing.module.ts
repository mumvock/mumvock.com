import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThemeOptionComponent } from './theme-option.component';

const routes: Routes = [
    {
        path: '',
        component: ThemeOptionComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThemeOptionRoutingModule {}
