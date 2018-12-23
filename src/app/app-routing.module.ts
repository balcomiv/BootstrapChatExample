import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { LoginGuard } from './guards/login.guard';
import { IsOwnerGuard } from './guards/is-owner.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'chat', canActivate: [AuthGuard],
    children: [
      { path: '', component: ChatComponent },
      { path: ':id', component: ChatComponent },
    ]
  },
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:userId/edit', component: EditProfileComponent, canActivate: [AuthGuard, IsOwnerGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: '/login'}, //  Update this to be 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
