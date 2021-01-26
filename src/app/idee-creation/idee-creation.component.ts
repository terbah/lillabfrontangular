import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {TypeUserService} from '../services/type-user.service';
import {IdeasService} from '../services/ideas.service';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-idee-creation',
  templateUrl: './idee-creation.component.html',
  styleUrls: ['./idee-creation.component.css']
})
export class IdeeCreationComponent implements OnInit, OnDestroy {
  ideeCreationForm: FormGroup;
  public domaines: Array<any>;
  public competences: Array<any>;
  public laboratoires: Array<any>;
  competencesArray: Array<any> = [];
  domainesArray: Array<any> = [];

  constructor(private typeUserService: TypeUserService, private http: HttpClient, private ideaService: IdeasService, private builder: FormBuilder,
              public snackBar: MatSnackBar) {
    this.ideeCreationForm = this.builder.group({
      titre: [null, [Validators.required]],
      domaineList: [null, [Validators.required]],
      competenceList: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      datecreation: new Date(),
    });
  }

  @ViewChild(FormGroupDirective, {static: true}) formGroupDirective: FormGroupDirective;

  ngOnInit() {
    this.typeUserService.getAllDomaine().subscribe(data => {
      this.domaines = data;
    });
    this.typeUserService.getAllCompetences().subscribe(data => {
      this.competences = data;
    });
    this.typeUserService.getAllLaboratories().subscribe(data => {
      this.laboratoires = data;
    });
  }

  onSubmit() {
    console.log(this.ideeCreationForm.value);
    this.ideeCreationForm.controls['competenceList'].value.map(data => {
      this.competencesArray.push(data);
    });

    this.ideeCreationForm.controls['domaineList'].value.map(data => {
      this.domainesArray.push(data);
    });

   /* this.ideeCreationForm.controls['laboratories'].value.map(data => {
      this.laboratoriesArray.push(data);
    });*/

    let ideeNew: object = {
      utilisateur: JSON.parse(localStorage.getItem('UserConnected')),
      titre: this.ideeCreationForm.controls['titre'].value,
      description: this.ideeCreationForm.controls['description'].value,
      datecreation: new Date(),
      competenceList: this.competencesArray,
      domaineList: this.domainesArray
    };

 //   console.log(ideeNew);

    this.ideaService.createIdea(ideeNew).subscribe(
      data => {
        if (data == null) {
          this.snackBar.open('Une nouvelle idée vient d\'etre créée', '', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });

        } else {
          this.snackBar.open('Veuillez reessayer', '', {
            duration: 3000,
            panelClass: ['red-snackbar']
          });
          // this.openSnackBar('Il existe déjà une personne ayant ce mail', 'F', 'red-snackbar');
        }
      }
    );
    this.ideeCreationForm.reset();
    this.competencesArray = [];
    this.domainesArray = [];
  }

  logout() {
    this.typeUserService.logout();
  }

  ngOnDestroy(): void {
    this.domaines = [];
    this.competences = [];
  }
}
