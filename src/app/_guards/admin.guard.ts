// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertService } from '../_services';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router,
      private alertservice: AlertService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('adminUser')) {
            // logged in so return true
            return true;
        }
        this.alertservice.showAlert('You are not logged in!');
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
