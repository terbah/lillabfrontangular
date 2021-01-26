import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';
import {TypeUserService} from '../services/type-user.service';
import {HttpClient} from '@angular/common/http';
import {IdeasService} from '../services/ideas.service';
import {ProjetService} from '../services/projet.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-projet-creation',
  templateUrl: './projet-creation.component.html',
  styleUrls: ['./projet-creation.component.css']
})
export class ProjetCreationComponent implements OnInit, OnDestroy {
  formProjet: FormGroup;
  public domaines: Array<any>;
  public competences: Array<any>;
  competencesArray: Array<any> = [];
  domainesArray: Array<any> = [];
  user: User = JSON.parse(localStorage.getItem('UserConnected'));
  userIng: string = 'Ingenieur de projet';

  constructor(private typeUserService: TypeUserService, private projetService: ProjetService, private http: HttpClient, private ideaService: IdeasService, private builder: FormBuilder,
              public snackBar: MatSnackBar) {
    this.formProjet = this.builder.group({
      titre: [null, [Validators.required]],
      domainesList: [null, [Validators.required]],
      competencesList: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      budget: [null, [Validators.required, Validators.minLength(1)]],
      nbparticipants: [null, [Validators.required, Validators.minLength(1)]],
      dateDebut: [null, [Validators.required, Validators.minLength(1)]],
      dateFin: [null, [Validators.required, Validators.minLength(1)]],
      dateCreation: new Date(),
    });
  }

  ngOnInit() {
    this.typeUserService.getAllDomaine().subscribe(data => {
      this.domaines = data;
    });
    this.typeUserService.getAllCompetences().subscribe(data => {
      this.competences = data;
    });
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    this.formProjet.controls['competencesList'].value.map(data => {
      this.competencesArray.push(data);
    });

    this.formProjet.controls['domainesList'].value.map(data => {
      this.domainesArray.push(data);
    });

    let projet: object = {
      utilisateur: JSON.parse(localStorage.getItem('UserConnected')),
      titre: this.formProjet.controls['titre'].value,
      description: this.formProjet.controls['description'].value,
      dateCreation: new Date(),
      competencesList: this.competencesArray,
      domainesList: this.domainesArray,
      budget: this.formProjet.controls['budget'].value,
      nbparticipants: this.formProjet.controls['nbparticipants'].value,
      dateDebut: this.formProjet.controls['dateDebut'].value,
      dateFin: this.formProjet.controls['dateFin'].value,
    };

    console.log(projet);
    this.projetService.createProjet(projet).subscribe(
      data => {
        if (data == null) {
          this.snackBar.open('Un nouvel appel à projet vient d\'etre créé', '', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });

        } else {
          this.snackBar.open('Veuillez reessayer', '', {
            duration: 3000,
            panelClass: ['red-snackbar']
          });
        }
      }
    );
    this.formProjet.reset();
    this.competencesArray = [];
    this.domainesArray = [];
  }

  logout() {
    this.typeUserService.logout();
  }
}
