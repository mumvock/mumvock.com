import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AsideModule } from './components/aside/aside.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './core/components/loader/loader.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AsideModule,
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
