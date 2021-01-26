import {Component, OnInit} from '@angular/core';
import {IdeasService} from '../services/ideas.service';
import {TypeUserService} from '../services/type-user.service';
import {Idee} from '../Idee';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {IdeePerUserModifyComponent} from '../idee-per-user-modify/idee-per-user-modify.component';
import {timer} from 'rxjs';


@Component({
  selector: 'app-idee-per-user',
  templateUrl: './idee-per-user.component.html',
  styleUrls: ['./idee-per-user.component.css']
})
export class IdeePerUserComponent implements OnInit {
  idees: Idee[] = [];
  ideeDetails: Idee;
  dataIsAvailable = false;
  timerSubscription = timer(0, 5000);

  constructor(private ideaService: IdeasService, private typeUserService: TypeUserService,
              private route: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllIdeasByUser();
    this.subscribeToData();
  }

  logout() {
    this.typeUserService.logout();
  }

  getAllIdeasByUser() {
    const userInfo = JSON.parse(localStorage.getItem('UserConnected'));
    console.log(userInfo);
    this.ideaService.getAllIdeasByUser(userInfo.email.toString()).pipe(
      map(data => data.map(ideeLine => {
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
        return idee;

      }))
    ).subscribe(newIdee => {
      this.idees = newIdee;
    });
  }

  /* onViewIdee(id: number) {
     this.route.navigate(['/ideesPerUser', 'view', id]);
   }
 */
  getIdeeDetail(idIdee: number) {
    this.ideaService.getIdeeDetail(idIdee).pipe(
      map(ideeLine => {
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
        return idee;
      })
    ).subscribe(
      data => {
        this.ideeDetails = data;
        this.dataIsAvailable = true;
        console.log(this.ideeDetails);
      }
    );
    setTimeout(() => {
      this.openDialog();
    }, 2000);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.restoreFocus = false;
    dialogConfig.width = '800px';
    dialogConfig.data = {
      data: this.ideeDetails
    };
    this.dialog.open(IdeePerUserModifyComponent, dialogConfig);
  }

  deleteIdeePerUser(idIdee: number) {
    console.log(idIdee);
    this.ideaService.deleteIdeePerUser(idIdee).subscribe(
      data => {
        // console.log(data);
        // window.location.reload();
        this.subscribeToData();
      }
    );
    // window.location.reload();
  }

  onViewIdee(id: number) {
    this.route.navigate(['/ideesPerUser', 'view', id]);
  }

  subscribeToData(): void {
    this.timerSubscription.subscribe(value => {
      this.getAllIdeasByUser();
    });
  }

}
