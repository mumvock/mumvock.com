import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export enum APP_ROUTES {
    pages   = 'pages',
    options = 'options',
};

const routes: Routes = [
    {
        path: APP_ROUTES.pages,
        outlet: APP_ROUTES.pages,
        loadChildren: () =>
            import('./pages/pages.module').then((m) => m.PagesModule),
    },
    {
        path: APP_ROUTES.options,
        outlet: APP_ROUTES.options,
        loadChildren: () =>
            import('./options/options.module').then((m) => m.OptionsModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload',
        scrollPositionRestoration: 'top',
    })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
