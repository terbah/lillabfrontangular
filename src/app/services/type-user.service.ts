import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeUserService {
  userAuthentificate: User;
  isAuthentificate = false;

  constructor(private http: HttpClient, public snackbar: MatSnackBar, private route: Router) {
  }

  getAllType(): Observable<any> {
    return this.http.get(environment.serveur_url + 'types_utilisateurs');
  }

  getAllDomaine(): Observable<any> {
    return this.http.get(environment.serveur_url + 'domaines');
  }

  getAllLaboratories(): Observable<any> {
    return this.http.get(environment.serveur_url + 'get_laboratory');
  }

  getAllCompetences(): Observable<any> {
    return this.http.get(environment.serveur_url + 'competences');
  }

  createUser(user: User): Observable<any> {
    return this.http.post(environment.serveur_url + 'utilisateur', user, {responseType: 'text'});
  }

  loginUser(user: object): void {
    this.http.post(environment.serveur_url + 'utilisateur_authentification', user, {responseType: 'json'}).subscribe((data: User) => {
      if (data === null) {
        this.snackbar.open('Email ou mot de passe incorrect! Veuillez réessayer', '', {
          duration: 3000,
          panelClass: ['red-snackbar']
        });

      } else {
        console.log('data' + data);
        this.userAuthentificate = data;
        localStorage.setItem('UserConnected', JSON.stringify(this.userAuthentificate));
        this.isAuthentificate = true;
        console.log(this.userAuthentificate.libelle);
        this.route.navigate(['/idees']);
      }
    });
  }

  logout() {
    localStorage.removeItem('UserConnected');
    this.route.navigate(['/authentification']);
  }
}
