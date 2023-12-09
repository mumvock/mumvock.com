import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AsideModule } from './components/aside/aside.module';
import { LoaderModule } from './core/loader/loader.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        LoaderModule,
        AppRoutingModule,
        AsideModule,
        HeaderComponent,
        FooterComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
