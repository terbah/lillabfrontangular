import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TypeUserService} from './type-user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private  typeUserService: TypeUserService, private route: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.typeUserService.isAuthentificate || localStorage.getItem('UserConnected')) {
      return true;
    }
    this.route.navigate(['/authentification']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}
