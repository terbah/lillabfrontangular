import { Component, OnInit } from '@angular/core';
import {Idee} from '../Idee';
import {IdeasService} from '../services/ideas.service';
import {TypeUserService} from '../services/type-user.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Evenement} from '../Evenement';
import {User} from '../user';
import {EventsService} from '../services/events.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.css']
})
export class EvenementsComponent implements OnInit {

  isAuthentificate: boolean;
  public evenements: Evenement[] = [];

  /*idEvent: number;
  lieu: string;
  description: string;
  date: string;
  utilisateur: User;*/

  constructor(private eventsService: EventsService, private typeUserService: TypeUserService, private route: Router/*private ideasService: IdeasService*/) {
  }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventsService.getAllEvents().pipe(
      map(data => data.map(evenementLine => {
        const evenement: Evenement = new Evenement();
        evenement.idEvent = evenementLine.idEvent;
        evenement.lieu = evenementLine.lieu;
        evenement.titre = evenementLine.titre;
        evenement.description = evenementLine.description;
        evenement.date = evenementLine.date;
        evenement.user = evenementLine.utilisateurDto;

        return evenement;

      }))
    ).subscribe(newEvenement => {
      this.evenements = newEvenement;
    });
  }

  logout() {
    this.typeUserService.logout();
  }

}
