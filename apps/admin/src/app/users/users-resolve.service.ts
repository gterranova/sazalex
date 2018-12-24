import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { AuthenticationService } from '@sazalex/auth';
import { User } from '@sazalex/auth';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersListResolveService implements Resolve<User[]> {
  constructor(private authService: AuthenticationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.usersList();
  }
}

@Injectable({
  providedIn: 'root'
})
export class UsersDetailsResolveService implements Resolve<User> {
  constructor(private authService: AuthenticationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    if (id !== undefined) {
      return this.authService.getUser(id);
    }
    return of(<User>{});
  }
}

@Injectable({
  providedIn: 'root'
})
export class UsersSchemaDetailsResolveService implements Resolve<any> {
  constructor(private authService: AuthenticationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    return this.authService.getUser(id || '0', true);
  }
}
