import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {IdeasService} from '../services/ideas.service';
import {map} from 'rxjs/operators';
import {Idee} from '../Idee';
import {TypeUserService} from '../services/type-user.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable, timer} from 'rxjs';


@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.component.html',
  styleUrls: ['./menuprincipal.component.css']
})
export class MenuprincipalComponent implements OnInit {
  public idees: Idee[] = [];
  source = timer(0, 1000);
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  autoCompleteList: any[];
  @ViewChild('autocompleteInput', {static: true}) autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(private ideaService: IdeasService, private typeUserService: TypeUserService, private route: Router/*private ideasService: IdeasService*/) {
  }

  ngOnInit() {
    this.getAllIdeas();
    this.ideaService.filterIdeasByCompetenceOrDomaine('Mathématique', 'Géopolitique').subscribe(
      data => {
        console.log('filterIdeasByCompetenceAndDomaine' + JSON.stringify(data));
      }
    );
    // Chaque seconde on va récupérer les idées
    this.source.subscribe(data => {
      this.getAllIdeas();
    });
    // when user types something in input, the value changes will come through this
    /*this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    });*/
  }

  /* autoCompleteExpenseList(input) {
    const categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }

  // this is where filtering the data happens according to you typed value
  filterCategoryList(val) {
    const categoryList = []
    if (typeof val !== "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.idees.filter(idee => idee.domaines.filter(domaine))
      : this.allPosts;
  }*/

  getAllIdeas() {
    this.ideaService.getAllIdeas().pipe(
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

  logout() {
    this.typeUserService.logout();
  }

  onViewIdee(id: number) {
    this.route.navigate(['/ideesPerUser', 'view', id]);
  }


  addPouce(id: number) {
    const ideePouce = {
      utilisateur: JSON.parse(localStorage.getItem('UserConnected')),
      dateCreation: new Date(),
      'idee': {
        ididee: id,
      },
    };
    console.log('ideePouce' + JSON.stringify(ideePouce));
    this.ideaService.createPouce(ideePouce).subscribe();
    //this.idees = [];
   // this.getAllIdeas();
  }
}
