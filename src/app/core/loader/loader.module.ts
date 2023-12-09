import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { LoaderComponent } from './loader.component';
import { LoaderInterceptor } from './services/loader.interceptor';
import { LoaderService } from './services/loader.service';

@NgModule({
    declarations: [LoaderComponent],
    providers: [
        LoaderService,
        LoaderInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
    ],
})
export class LoaderModule {}
