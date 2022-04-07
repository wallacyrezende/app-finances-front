import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

/* Login Facebook */
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*HttpClient */
import { HttpClientModule } from '@angular/common/http';

/*Services*/
import { UserService } from './service/user/user.service';
import { StorageService } from './shared/local-storage/storage.service';
import { ReleasesService } from './service/releases/releases.service';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth.guard';
import { SecureInnerPagesGuard } from './shared/auth/secure-inner-pages.guard';

/* Sakai */
import { SakaiMaterialModule } from './sakai-material.module';
import { ConfigService } from './service/app.config.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

/* Components */
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReleasesComponent } from './components/releases/releases.component';
import { GraphicOverviewComponent } from './components/graphic-overview/graphic-overview.component';
import { ReleasesPageComponent } from './pages/releases-page/releases-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { CreateReleasesPageComponent } from './pages/create-releases-page/create-releases-page.component';

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
    UsersPageComponent,
    CreateReleasesPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SakaiMaterialModule,
    SocialLoginModule,
    ReactiveFormsModule
  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  providers: [
    ConfigService, FormBuilder, UserService, StorageService, ReleasesService,
    AuthService, AuthGuard, SecureInnerPagesGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookId),
          },
        ],
        onError: (err) => {
          console.log(err)
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide: LocationStrategy, 
      useClass: PathLocationStrategy
    },
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
