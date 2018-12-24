import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { User, LocalData } from '../models';

@Injectable()
export class TokenService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get currentUser(): LocalData {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser && currentUser !== 'undefined'
      ? JSON.parse(currentUser)
      : { user: {}, token: '' };
  }

  set currentUser(currentUser: LocalData) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  get user(): any {
    // set token if saved in local storage
    return this.currentUser.user;
  }

  set user(user: any) {
    // set token if saved in local storage
    this.currentUser = { ...this.currentUser, user: user };
  }

  get token(): string {
    // set token if saved in local storage
    return this.currentUser.token;
  }

  set token(token: string) {
    // set token if saved in local storage
    this.currentUser = { ...this.currentUser, token: token };
  }

  reset() {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
