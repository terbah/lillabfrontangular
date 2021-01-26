import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {
  // idees: Idee;
  // public competences: Array<any>;
  // public domaines: Array<any>;

  constructor(private http: HttpClient) {
  }

  getAllIdeas(): Observable<any> {
    return this.http.get<any>(environment.serveur_url+'idees');
  }

  createIdea(idee: object): Observable<any> {
    return this.http.post(environment.serveur_url + 'idee', idee);
  }

  createComment(comment: object): Observable<any> {
    return this.http.post(environment.serveur_url + 'commentaire', comment);
  }

  updateIdeePerUser(idee: object): Observable<any> {
    return this.http.post(environment.serveur_url + 'modifyIdeePerUser', idee);
  }

  getAllIdeasByUser(userEmail: string): Observable<any> {
    console.log('utilisateur' + userEmail);
    const params = new HttpParams().set('email', userEmail);
    return this.http.get(environment.serveur_url + 'ideesByUtilisateur', {params: params});
  }

  filterIdeasByCompetenceOrDomaine(competence: string, domaine: string) {
    const params = new HttpParams().set('competence', competence).set('domaine', domaine);
    return this.http.get(environment.serveur_url + 'filterByCompetenceOrDomaine', {params: params});
  }

  deleteIdeePerUser(idIdee: number): Observable<any> {
    return this.http.post(environment.serveur_url + 'deleteIdeePerUser', idIdee);
  }

  getIdeeDetail(idIdee: number): Observable<any> {
    const params = new HttpParams().set('idIdee', idIdee.toString());
    return this.http.get(environment.serveur_url + 'ideeDetail', {params: params});
  }

  /**
   * Récupération des commentaires d'une idée
   */

  getCommentperIdee(idIdee: number): Observable<any> {
    const params = new HttpParams().set('idIdee', idIdee.toString());
    return this.http.get(environment.serveur_url + 'commentsPerIdee', {params: params});
  }

  /**
   * Ajouter un pouce au clic
   */

  createPouce(pouce: object): Observable<any> {
    return this.http.post(environment.serveur_url + 'pouce', pouce);
  }

  /*getPouceByIdee(idIdee: number): Observable<any> {
    const params = new HttpParams().set('idIdee', idIdee.toString());
    return this.http.get('http://localhost:8080/pouces/idee', {params: params});
  }*/
}
