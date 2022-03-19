import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Components */
import { LoginComponent } from './components/login/login.component';

/* Sakai */
import { SakaiMaterialModule } from './sakai-material.module';
import { ConfigService } from './service/app.config.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SakaiMaterialModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
     ConfigService
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
