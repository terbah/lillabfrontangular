import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http: HttpClient) {
  }

  getAllProjets(): Observable<any> {
    return this.http.get<any>(environment.serveur_url + 'projets');
  }

  createProjet(projet: object): Observable<any> {
    return this.http.post(environment.serveur_url + 'projet', projet);
  }
}
