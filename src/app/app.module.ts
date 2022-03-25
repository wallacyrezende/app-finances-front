import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Login Facebook */
import { FormBuilder } from '@angular/forms';
import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

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
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { ProductService } from './service/productservice';
import { GraphicOverviewComponent } from './components/graphic-overview/graphic-overview.component';
import { ReleasesPageComponent } from './pages/releases-page/releases-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';



@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    LoginComponent,
    MenuComponent,
    HomePageComponent,
    ReleasesComponent,
    GraphicOverviewComponent,
    ReleasesPageComponent,
    UsersPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SakaiMaterialModule,
    SocialLoginModule,
  ],
  providers: [
    ConfigService, ProductService, FormBuilder,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('392274785662753'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    },
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
