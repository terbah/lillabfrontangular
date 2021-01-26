import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Idee} from '../Idee';
import {IdeasService} from '../services/ideas.service';
import {timer} from 'rxjs';
import {TypeUserService} from '../services/type-user.service';

@Component({
  selector: 'app-idee-per-user-modify',
  templateUrl: './idee-per-user-modify.component.html',
  styleUrls: ['./idee-per-user-modify.component.css']
})
export class IdeePerUserModifyComponent implements OnInit {
  form: FormGroup;
  ideeModify: Idee;
  idees: Idee[] = [];
  public domaines: Array<any>;
  public competences: Array<any>;
  competencesArray: Array<any> = [];
  domainesArray: Array<any> = [];
  timerSubscription = timer(1000);

  constructor(private typeUserService: TypeUserService, private dialogRef: MatDialogRef<IdeePerUserModifyComponent>, @Inject(MAT_DIALOG_DATA) data: any, private builder: FormBuilder, private ideaService: IdeasService, public snackBar: MatSnackBar) {
    this.ideeModify = data.data;
    this.form = this.builder.group({
      titre: [this.ideeModify.titre, [Validators.required]],
      domaineList: [this.ideeModify.domaines],
      competenceList: [this.ideeModify.comptences],
      description: [this.ideeModify.description, [Validators.required, Validators.minLength(10)]],
    });
  }

  @ViewChild(FormGroupDirective, {static: true}) formGroupDirective: FormGroupDirective;

  ngOnInit() {
    // console.log('IdeePerUserModifyComponent dtatata' + JSON.stringify(this.ideeModify));
    this.typeUserService.getAllDomaine().subscribe(data => {
      //console.log('domainesArray' + JSON.stringify(data));
      this.domaines = data;
      console.log('domainesArray' + JSON.stringify(this.domaines));
    });

    this.typeUserService.getAllCompetences().subscribe(data => {
      this.competences = data;
      console.log('domainesArray' + JSON.stringify(this.competences));
    });

    //console.log("competences " + JSON.stringify(this.competencesArray));
    // console.log("domaines " + JSON.stringify(this.domainesArray));
  }

  update() {
    this.form.controls['competenceList'].value.map(data => {
      //const objectCompetence = {'libelle': data};
      this.competencesArray.push(data);
    });

    this.form.controls['domaineList'].value.map(data => {
      //const objectCompetence = {'libelle': data};
      this.domainesArray.push(data);
    });

    const ideeToUpdate = {
      ididee: this.ideeModify.idIdee,
      utilisateur: JSON.parse(localStorage.getItem('UserConnected')),
      titre: this.form.controls['titre'].value,
      description: this.form.controls['description'].value,
      datemodif: new Date(),
      competenceList: this.competencesArray,
      domaineList: this.domainesArray
    };
    this.ideaService.updateIdeePerUser(ideeToUpdate).subscribe(
      data => {
        if (data == null) {
          this.snackBar.open('Votre idée vient d\'etre modifiée', '', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
          this.dialogRef.close();

        } else {
          this.snackBar.open('Veuillez reessayer', '', {
            duration: 3000,
            panelClass: ['red-snackbar']
          });
          // this.openSnackBar('Il existe déjà une personne ayant ce mail', 'F', 'red-snackbar');
        }
      }
    );

    this.formGroupDirective.resetForm();

  }

  close() {
    this.dialogRef.close();

  }
}
