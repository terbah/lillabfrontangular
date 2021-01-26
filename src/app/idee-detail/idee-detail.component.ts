import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IdeasService} from '../services/ideas.service';
import {TypeUserService} from '../services/type-user.service';
import {map} from 'rxjs/operators';
import {Idee} from '../Idee';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Commentaire} from '../commentaire';
import {timer} from 'rxjs';

@Component({
  selector: 'app-idee-detail',
  templateUrl: './idee-detail.component.html',
  styleUrls: ['./idee-detail.component.css']
})
export class IdeeDetailComponent implements OnInit {
  likeLength: number;
  commentLength: number;
  ideeDetails: Idee;
  dataIsAvailable = false;
  commentCreationForm: FormGroup;
  commentsPerIdea: Commentaire[] = [];
  source = timer(0, 3000);

  constructor(private route: ActivatedRoute, private ideaService: IdeasService, private typeUserService: TypeUserService,
              private builder: FormBuilder, public snackBar: MatSnackBar) {
    this.commentCreationForm = this.builder.group({
      texteComment: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  @ViewChild(FormGroupDirective, {static: true}) formGroupDirective: FormGroupDirective;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.getIdeeDetail(id);
    // Chaque 5 secondes on va récupérer les commentaires d'une idée
    this.source.subscribe(data => {
      this.getCommentsPerIdea(id);
    });
    // console.log('getCommentsPerIdea');
    // this.getCommentsPerIdea(id);
    // console.log('getCommentsPerIdea');
  }

  /***
   *
   * @param id
   * Cette fonction récupère le parametre de l'idée passé dans l'url et fais un appel
   * au back pour récupérer les détails de l'idée
   */
  getIdeeDetail(id: number) {

    /* this.ideaService.getIdeeDetail(id).subscribe(
       data => {
         console.log('details' + JSON.stringify(data));
       }
     );*/
    this.ideaService.getIdeeDetail(id).pipe(
      map(ideeLine => {
        console.log('data' + JSON.stringify(ideeLine));
       // console.log('dataIdeeline' + ideeLine.laboratory.designation);
        //ideeLine.laboratory.designation
        const idee: Idee = new Idee();
        idee.idIdee = ideeLine.idideeDto;
        idee.titre = ideeLine.titre;
        idee.description = ideeLine.description;
        idee.dateCrea = ideeLine.dateCrea;
        idee.comptences = ideeLine.competenceDtoList;
        idee.domaines = ideeLine.domaineDtos;
        idee.commentaires = ideeLine.commentaireDtoList;
        idee.like = ideeLine.unpouce;
        idee.user = ideeLine.user;
        this.likeLength = idee.like.length;
        this.commentLength = idee.commentaires.length;
        return idee;
      })
    ).subscribe(
      data => {
        this.ideeDetails = data;
        this.dataIsAvailable = true;
        console.log(this.ideeDetails);
      }
    );
  }

  /***
   * Appel du service pour récupérer la liste des commentaires d'une idée
   */
  getCommentsPerIdea(id: number) {
    this.ideaService.getCommentperIdee(id).pipe(
      map(data => data.map(commentLine => {
        const comment: Commentaire = new Commentaire();
        comment.utilisateurDto = commentLine.utilisateurDto;
        comment.dateMODIF = commentLine.dateMODIF;
        comment.textCom = commentLine.textCom;

        return comment;

      }))
    ).subscribe(commentPerIdee => {
      this.commentsPerIdea = commentPerIdee;
    });
  }

  logout() {
    this.typeUserService.logout();
  }

  /***
   * Ajout d'un commentaire à une idée
   *
   *
   */
  onSubmit() {
    // transformation de l'idée dto en idée avant d'envoyer les données du formulaire
    const ideeTransform = {
      utilisateur: JSON.parse(localStorage.getItem('UserConnected')),
      titre: this.ideeDetails.titre,
      description: this.ideeDetails.description,
      datecreation: this.ideeDetails.dateCrea,
      competenceList: this.ideeDetails.comptences,
      domaineList: this.ideeDetails.domaines

    };

    const commentNew = {
      utilisateur: JSON.parse(localStorage.getItem('UserConnected')),
      'idee': {
        ididee: this.ideeDetails.idIdee,
        utilisateur: JSON.parse(localStorage.getItem('UserConnected')),
        titre: this.ideeDetails.titre,
        description: this.ideeDetails.description,
        datecreation: this.ideeDetails.dateCrea,
        competenceList: this.ideeDetails.comptences,
        domaineList: this.ideeDetails.domaines
      },
      texteComment: this.commentCreationForm.controls['texteComment'].value,
      dateCreation: new Date()
    };

    console.log(commentNew);
    this.ideaService.createComment(commentNew).subscribe(
      data => {
        if (data == null) {
          this.snackBar.open('Votre commentaire a été ajouté', '', {
            duration: 2000,
            panelClass: ['green-snackbar']
          });

        } else {
          this.snackBar.open('Veuillez reessayer', '', {
            duration: 2000,
            panelClass: ['red-snackbar']
          });
          // this.openSnackBar('Il existe déjà une personne ayant ce mail', 'F', 'red-snackbar');
        }
      }
    );
    this.commentCreationForm.controls['texteComment'].setValue('');

  }
}
