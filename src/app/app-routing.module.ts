import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthentificationComponent} from './authentification/authentification.component';
import {TypeUserComponent} from './type-user/type-user.component';
import {MenuprincipalComponent} from './menuprincipal/menuprincipal.component';
import {ProjetsComponent} from './projets/projets.component';
import {SuccessStoriesComponent} from './success-stories/success-stories.component';
import {EvenementsComponent} from './evenements/evenements.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './services/auth-guard.service';
import {IdeeCreationComponent} from './idee-creation/idee-creation.component';
import {IdeePerUserComponent} from './idee-per-user/idee-per-user.component';
import {IdeeDetailComponent} from './idee-detail/idee-detail.component';
import {EvenementCreationComponent} from './evenement-creation/evenement-creation.component';
import {ProjetCreationComponent} from './projet-creation/projet-creation.component';


const routes: Routes = [
  {path: 'authentification', component: AuthentificationComponent},
  {path: '', redirectTo: 'authentification', pathMatch: 'full'},
  {path: 'inscription', component: TypeUserComponent},
  {path: 'idees', canActivate: [AuthGuard], component: MenuprincipalComponent},
  {path: 'ideesPerUser', canActivate: [AuthGuard], component: IdeePerUserComponent},
  {path: 'ideesPerUser/view/:id', canActivate: [AuthGuard], component: IdeeDetailComponent},
  {path: 'ideeCreation', canActivate: [AuthGuard], component: IdeeCreationComponent},
  {path: 'projets', canActivate: [AuthGuard], component: ProjetsComponent},
  {path: 'projetCreation', canActivate: [AuthGuard], component: ProjetCreationComponent},
  {path: 'stories', canActivate: [AuthGuard], component: SuccessStoriesComponent},
  {path: 'evenements', canActivate: [AuthGuard], component: EvenementsComponent},
  {path: 'evenementCreation', canActivate: [AuthGuard], component: EvenementCreationComponent},
  {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
