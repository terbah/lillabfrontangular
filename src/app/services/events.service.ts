import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {
  }

  getAllEvents(): Observable<any> {
    return this.http.get<any>(environment.serveur_url + 'events');
  }

  createEvent(evenement: object): Observable<any> {
    return this.http.post(environment.serveur_url + 'evenement', evenement);
  }

}
