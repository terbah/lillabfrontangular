import {User} from './user';
import {Competence} from './competence';
import {Domaine} from './domaine';
import {Commentaire} from './commentaire';
import {Like} from './like';
import {Laboratorie} from './Laboratorie';

export class Idee {
  idIdee: number;
  titre: string;
  description: string;
  dateCrea: string;
  user: User;
  comptences: Competence[];
  laboratoires: Laboratorie[];
  domaines: Domaine[];
  commentaires: Commentaire[];
  like: Like[];
}
