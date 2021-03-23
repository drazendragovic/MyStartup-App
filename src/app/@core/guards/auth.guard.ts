import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NotificationService } from '../services';
import { AccountService } from '../services/account.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router, private notify: NotificationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.firstChild?.data['role'] as Array<string>;
    if (roles) {
      const potvrda = this.accountService.checkRole(roles);
      if (potvrda) {
        return true;
      } else {
        this.notify.onError('Access to the requested pages is not allowed!');
      }
    }
    if (this.accountService.isUserLogged()) {
      return true;
    }

    this.notify.onError('Access to the application is possible only for registered users!');
    this.router.navigate(['/home'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
