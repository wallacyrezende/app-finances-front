import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AppMainComponent } from './app.main.component';
import { ReleasesPageComponent } from './pages/releases-page/releases-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { CreateReleasesPageComponent } from './pages/create-releases-page/create-releases-page.component';
import { SecureInnerPagesGuard } from './shared/auth/secure-inner-pages.guard';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path:'login', component: LoginComponent },
  {
    path: '', component: AppMainComponent, canActivateChild: [AuthGuard],
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'releases', component: ReleasesPageComponent },
      { path: 'create-releases', component: CreateReleasesPageComponent},
      { path: 'create-users', component: UsersPageComponent, canActivate: [SecureInnerPagesGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
