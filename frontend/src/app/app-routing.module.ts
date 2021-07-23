import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/pages/login/login.component';
import { MovieDetailsComponent } from './features/pages/movie-details/movie-details.component';
import { MovieListComponent } from './features/pages/movie-list/movie-list.component';
import { SignupComponent } from './features/pages/signup/signup.component';


const routes: Routes = [
  {
    path:"",
    component: MovieListComponent,
  },
  {
    path: "login", 
    component: LoginComponent,
  }, {
    path: "sign-up",
    component: SignupComponent,
  },
  {
    path: "movie/:id",
    component: MovieDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
