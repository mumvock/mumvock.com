import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

export enum PAGES_ROUTES {
    about = 'about',
    news = 'news',
    notFound = 'not-found',
};

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: PAGES_ROUTES.about,
                loadChildren: () =>
                    import('./about/about.module').then((m) => m.AboutModule),
            },
            {
                path: PAGES_ROUTES.news,
                loadChildren: () =>
                    import('./news/news.module').then((m) => m.NewsModule),
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: PAGES_ROUTES.about
            },
            {
                path: PAGES_ROUTES.notFound,
                loadChildren: () =>
                    import('./../core/pages/not-found/not-found.module').then(
                        (m) => m.NotFoundModule
                    ),
            },
            {
                path: '**',
                redirectTo: PAGES_ROUTES.notFound,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
