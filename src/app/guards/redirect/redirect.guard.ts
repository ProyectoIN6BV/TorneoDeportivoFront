import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResUserService } from '../../services/resUser/res-user.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user  = this.restUser.getUser();
      if(user==undefined || user == null){
        return true;
      }else if(user.role=="ROLE_USER"){
        this.router.navigateByUrl('home');
        return false;
      }else if(user.role=="ROLE_ADMINLEAGUE"){
        this.router.navigateByUrl('homeAdmin');
        return false;
      }
  }
  constructor(public restUser:ResUserService, private router:Router){}
}
