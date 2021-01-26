import {User} from './user';
import {Competence} from './competence';
import {Domaine} from './domaine';


export class Projet {
  idProjet: number;
  titre: string;
  description: string;
  dateCreation: string;
  dateModif: string;
  utilisateur: User;
  dateDebut: string;
  dateFin: string;
  budget: number;
  numberPartcipants: number;
  competencesList: Competence[];
  domainesList: Domaine[];

}
