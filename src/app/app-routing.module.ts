import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'pages',
        outlet: 'pages',
        loadChildren: () =>
            import('./pages/pages.module').then((m) => m.PagesModule),
    },
    {
        path: 'options',
        outlet: 'options',
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
