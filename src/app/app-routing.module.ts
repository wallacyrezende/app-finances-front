import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppMainComponent } from './app.main.component';

const routes: Routes = [
  {
    path: '', component: AppMainComponent,
    children: [
      { path: 'home', component: HomeComponent },
    ]
  },
  {path:'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
