import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OptionsComponent } from './options.component';

export enum OPTIONS_ROUTES {
    theme = 'theme',
    notFound = 'not-found',
};

const routes: Routes = [
    {
        path: '',
        component: OptionsComponent,
        children: [
            {
                path: OPTIONS_ROUTES.theme,
                loadChildren: () =>
                    import('./theme-option/theme-option.module').then((m) => m.ThemeOptionModule),
            },
            {
                path: OPTIONS_ROUTES.notFound,
                loadChildren: () =>
                    import('./../core/pages/not-found/not-found.module').then(
                        (m) => m.NotFoundModule
                    ),
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'theme'
            },
            {
                path: '**',
                redirectTo: OPTIONS_ROUTES.notFound,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OptionsRoutingModule {}
