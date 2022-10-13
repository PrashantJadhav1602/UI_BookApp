import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
          console.log("in guard")

        let uname = localStorage.getItem("username");
        if(uname!=null){
          return true;
        } else {
          this.router.navigate(["/login"])
          return false;
        }   
  }
  
}
