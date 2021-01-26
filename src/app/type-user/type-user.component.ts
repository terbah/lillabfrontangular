import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TypeUserService} from '../services/type-user.service';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-type-user',
  templateUrl: './type-user.component.html',
  styleUrls: ['./type-user.component.css']
})
export class TypeUserComponent implements OnInit, OnDestroy {
  public types: Array<any>;
  public domaines: Array<any>;
  public laboratoires: Array<any>;

  userCreationForm: FormGroup;

  constructor(private typeUserService: TypeUserService, private builder: FormBuilder, public snackBar: MatSnackBar, public router: Router) {
    this.userCreationForm = this.builder.group({
      nom: [null, [Validators.required, Validators.minLength(2)]],
      prenom: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      motdepasse: [null, [Validators.required, Validators.minLength(8)]],
      typeutilisateur: [null, [Validators.required]],
      domaine: [null, [Validators.required]],
      laboratory: [null, [Validators.required]],
    });
  }

  @ViewChild(FormGroupDirective, {static: true}) formGroupDirective: FormGroupDirective;

  ngOnInit(): void {
    this.typeUserService.getAllType().subscribe(data => {
      this.types = data;
    });

    this.typeUserService.getAllDomaine().subscribe(data => {
      this.domaines = data;
    });
    this.typeUserService.getAllLaboratories().subscribe(data => {
      this.laboratoires = data;
    });
  }

  onSubmit() {
    // const formValue = this.userCreationForm.value;
    // console.log(this.userCreationForm.value);
    this.typeUserService.createUser(this.userCreationForm.value).subscribe(
      data => {
        if (data === 'success') {
          this.snackBar.open('Inscription effectué avec succes', '', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
          this.router.navigate(['/authentification']);
        } else {
          this.snackBar.open('Il existe déjà une personne ayant ce mail', '', {
            duration: 3000,
            panelClass: ['red-snackbar']
          });
          // this.openSnackBar('Il existe déjà une personne ayant ce mail', 'F', 'red-snackbar');
        }
      }
    );

    this.formGroupDirective.resetForm();
  }

  ngOnDestroy(): void {
  }

  /* openSnackBar(message: string, action: string, config) {
     return this.snackBar.open(message, action, config);
   }*/
}
