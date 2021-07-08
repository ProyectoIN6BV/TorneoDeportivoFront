import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ResUserService } from '../../services/resUser/res-user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user  = this.restUser.getUser();
      if(user && user.role=='ROLE_ADMINLEAGUE'){
        return true;
      }else{
        this.router.navigateByUrl('');
        return false;
      }
  }
  
  constructor(private restUser:ResUserService, private router:Router){}
}
