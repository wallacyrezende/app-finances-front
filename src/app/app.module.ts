import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Sakai */
import { SakaiMaterialModule } from './sakai-material.module';
import { ConfigService } from './service/app.config.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

/* Components */
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { ProductService } from './service/productservice';



@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    ReleasesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SakaiMaterialModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
     ConfigService, ProductService
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
