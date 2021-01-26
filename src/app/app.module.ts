import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AuthGuard} from './services/auth-guard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {TypeUserComponent} from './type-user/type-user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {AuthentificationComponent} from './authentification/authentification.component';
import {MenuprincipalComponent} from './menuprincipal/menuprincipal.component';
import {ProjetsComponent} from './projets/projets.component';
import {SuccessStoriesComponent} from './success-stories/success-stories.component';
import {EvenementsComponent} from './evenements/evenements.component';
import {ProfileComponent} from './profile/profile.component';
import {TypeUserService} from './services/type-user.service';
import { IdeeCreationComponent } from './idee-creation/idee-creation.component';
import { IdeePerUserComponent } from './idee-per-user/idee-per-user.component';
import { IdeeDetailComponent } from './idee-detail/idee-detail.component';
import { IdeePerUserModifyComponent } from './idee-per-user-modify/idee-per-user-modify.component';
import { EvenementCreationComponent } from './evenement-creation/evenement-creation.component';
import {IdeasService} from './services/ideas.service';
import { ProjetCreationComponent } from './projet-creation/projet-creation.component';


@NgModule({
  declarations: [
    AppComponent,
    TypeUserComponent,
    AuthentificationComponent,
    MenuprincipalComponent,
    ProjetsComponent,
    SuccessStoriesComponent,
    EvenementsComponent,
    ProfileComponent,
    IdeeCreationComponent,
    IdeePerUserComponent,
    IdeeDetailComponent,
    IdeePerUserModifyComponent,
    EvenementCreationComponent,
    ProjetCreationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  providers: [TypeUserService, AuthGuard, IdeasService],
  bootstrap: [AppComponent],
  entryComponents: [IdeePerUserModifyComponent]
})
export class AppModule {
}
