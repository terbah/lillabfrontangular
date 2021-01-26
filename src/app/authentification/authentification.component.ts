import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {TypeUserService} from '../services/type-user.service';
import {MatSnackBar} from '@angular/material';
import {User} from '../user';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  userConnexionForm: FormGroup;
  userAuthentificate: User;
  isAuthentificate: boolean;

  constructor(private typeUserService: TypeUserService, private builder: FormBuilder, public snackbar: MatSnackBar) {
    this.userConnexionForm = this.builder.group({
      email: [null, [Validators.required, Validators.email]],
      motdepasse: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  @ViewChild(FormGroupDirective, {static: true}) formGroupDirective: FormGroupDirective;

  ngOnInit() {
    this.isAuthentificate = this.typeUserService.isAuthentificate;
  }

  onSubmit() {
    this.typeUserService.loginUser(this.userConnexionForm.value);
    this.isAuthentificate = this.typeUserService.isAuthentificate;
    this.formGroupDirective.resetForm();

  }
}
