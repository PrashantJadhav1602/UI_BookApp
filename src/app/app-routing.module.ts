import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './components/author/author.component';
import { BuybookComponent } from './components/buybook/buybook.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReaderComponent } from './components/reader/reader.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthorbooksComponent } from './components/authorbooks/authorbooks.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {path : "home",component: HomeComponent},
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "createbook", component: AuthorComponent, canActivate: [UserGuard]},
  { path: "viewbooks", component: AuthorbooksComponent },
  { path: "reader", component: ReaderComponent },
  {path: "buybook" , component: BuybookComponent},
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
