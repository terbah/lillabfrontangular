import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {TypeUserService} from '../services/type-user.service';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {EventsService} from '../services/events.service';

@Component({
  selector: 'app-evenement-creation',
  templateUrl: './evenement-creation.component.html',
  styleUrls: ['./evenement-creation.component.css']
})
export class EvenementCreationComponent implements OnInit, OnDestroy {

  evenementCreationForm: FormGroup;

  constructor(private typeUserService: TypeUserService, private http: HttpClient, private eventService: EventsService, private builder: FormBuilder,
              public snackBar: MatSnackBar) {
    this.evenementCreationForm = this.builder.group({
      lieu: [null, [Validators.required]],
      titre: [null, [Validators.required]],
      date: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(10)]],
    });
  }

  @ViewChild(FormGroupDirective, {static: true}) formGroupDirective: FormGroupDirective;

  ngOnInit() {
  }

  onSubmit() {

    console.log(this.evenementCreationForm.value);


    const evenementNew = {
      utilisateur: JSON.parse(localStorage.getItem('UserConnected')),
      lieu: this.evenementCreationForm.controls['lieu'].value,
      titre: this.evenementCreationForm.controls['titre'].value,
      description: this.evenementCreationForm.controls['description'].value,
      date: this.evenementCreationForm.controls['date'].value,
    };

    console.log(evenementNew);

    this.eventService.createEvent(evenementNew).subscribe(
      data => {
        if (data == null) {
          this.snackBar.open('Un nouvel évènement vient d\'etre créé', '', {
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

    this.formGroupDirective.resetForm();
  }

  logout() {
    this.typeUserService.logout();
  }

  ngOnDestroy(): void {
  }
}
