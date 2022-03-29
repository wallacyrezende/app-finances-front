import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AppMainComponent } from './app.main.component';
import { ReleasesPageComponent } from './pages/releases-page/releases-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { CreateReleasesPageComponent } from './pages/create-releases-page/create-releases-page.component';

const routes: Routes = [
  {
    path: '', component: AppMainComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'releases', component: ReleasesPageComponent },
      { path: 'create-releases', component: CreateReleasesPageComponent},
      { path: 'create-users', component: UsersPageComponent },
    ]
  },
  {path:'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
