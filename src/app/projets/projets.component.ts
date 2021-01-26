import {Component, OnInit} from '@angular/core';
import {Idee} from '../Idee';
import {IdeasService} from '../services/ideas.service';
import {map} from 'rxjs/operators';
import {Projet} from '../Projet';
import {ProjetService} from '../services/projet.service';
import {User} from '../user';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
  isAuthentificate: boolean;
  public projets: Projet[] = [];
  likeLength: number;
  commentLength: number;
  user: User = JSON.parse(localStorage.getItem('UserConnected'));
  userIng: string = 'Ingenieur de projet';

  constructor(private projetService: ProjetService, /*private ideasService: IdeasService*/) {
  }

  ngOnInit() {
    // this.isAuthentificate = this.ideaService.isAuthentificate;
    this.getAllProjets();
    // this.getAllProjets();
  }

  getAllProjets() {
    this.projetService.getAllProjets().pipe(
      map(data => data.map(projetLine => {
        console.log(JSON.stringify(projetLine));
        const projet: Projet = new Projet();
        projet.titre = projetLine.titre;
        projet.description = projetLine.description;
        projet.dateCreation = projetLine.datecreation;
        projet.competencesList = projetLine.comptenceDtoList;
        projet.domainesList = projetLine.domaineDtos;
        projet.utilisateur = projetLine.utilisateurDto;
        projet.budget = projetLine.budget;
        projet.dateDebut = projetLine.datedebut;
        projet.dateFin = projetLine.datefin;
        projet.numberPartcipants = projetLine.nbparticipants;
        projet.dateModif = projetLine.datemodif;

        return projet;

      }))
    ).subscribe(newProjet => {
      this.projets = newProjet;
    });
  }

}
