import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, timer } from 'rxjs';

import { TokenService } from './token.service';
import { User } from '../models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  public token: string;
  private refreshSubscription: any;
  private baseUrl = '';
  private prefix = '/auth';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private helper: JwtHelperService
  ) {
    // set token if saved in local storage
    this.token = tokenService.token;
  }

  login(username: string, password: string): Observable<boolean> {
    // add authorization header with jwt token
    return this.post('/jwt/create', {
      email: username,
      password: password
    }).pipe(
      map((response: any) => {
        // login successful if there's a jwt token in the response
        const { user, token } = response;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          this.tokenService.token = token;
          this.tokenService.user = user;

          this.scheduleRenewal();
          return true;
        }
        return false;
      })
    );
  }

  refreshToken() {
    // add authorization header with jwt token
    return this.post('/jwt/refresh', {
      token: this.tokenService.token
    }).subscribe((response: any) => {
      // login successful if there's a jwt token in the response
      const token = response.token;
      if (token) {
        // store username and jwt token in local storage to keep user logged in between page refreshes
        this.tokenService.token = this.token = token;
        this.scheduleRenewal();
      }
    });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    this.unscheduleRenewal();
    this.tokenService.reset();
  }

  usersList(): Observable<User[]> {
    return <Observable<User[]>>this.get('/users');
  }

  getUser(uid: string, schema: boolean = false): Observable<User> {
    return <Observable<User>>(
      this.get(`/users/${uid}${schema ? '?schema=1' : ''}`)
    );
  }

  userActivate(uid: string, token: string): Observable<any> {
    return this.post('/users/activate', { uid: uid, token: token });
  }

  userSetEmail(newEmail: string, currentPassword: string): Observable<any> {
    return this.post('/email', {
      current_password: currentPassword,
      new_email: newEmail
    });
  }

  userSetPassword(
    newPassword: string,
    currentPassword: string
  ): Observable<any> {
    return this.post('/password', {
      new_password: newPassword,
      current_password: currentPassword
    });
  }

  userPasswordReset(email: string): Observable<any> {
    return this.post('/password/reset', { email: email });
  }

  userPasswordResetConfirm(
    uid: string,
    newPassword: string,
    token: string
  ): Observable<any> {
    return this.post('/password/reset/confirm', {
      uid: uid,
      token: token,
      new_password: newPassword
    });
  }

  currentUser(): Observable<User> {
    return this.get('/me').pipe(
      map(user => (this.tokenService.user = <User>user))
    );
  }

  userCreate(data: Partial<User>): Observable<any> {
    return this.post('/users', data);
  }

  userUpdate(uid: string, data: Partial<User>): Observable<any> {
    return this.put(`/users/${uid}`, { ...data, _id: uid });
  }

  userDelete(uid: string): Observable<any> {
    console.log('this.delete', `/users/${uid}`);

    return this.delete(`/users/${uid}`);
  }

  public scheduleRenewal() {
    if (this.token === '' || this.helper.isTokenExpired()) {
      return;
    }
    this.unscheduleRenewal();

    const expiresAt = this.helper.getTokenExpirationDate(this.token);
    const now = Date.now();
    const offset = expiresAt.getTime() - now - 30 * 1000;

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = timer(Math.max(1, offset)).subscribe(() => {
      // console.log("TOKEN RENEW");
      this.refreshToken();
    });
  }

  public unscheduleRenewal() {
    if (!this.refreshSubscription) {
      return;
    }
    this.refreshSubscription.unsubscribe();
  }

  private get(url: string) {
    const options = { headers: this.createRequestHeader() };
    return this.http.get(`${this.baseUrl}${this.prefix}${url}`, options);
  }

  private post(url: string, payload: any) {
    const options = { headers: this.createRequestHeader() };
    return this.http.post(
      `${this.baseUrl}${this.prefix}${url}`,
      JSON.stringify(payload),
      options
    );
  }

  private put(url: string, payload: any) {
    const options = { headers: this.createRequestHeader() };
    return this.http.put(
      `${this.baseUrl}${this.prefix}${url}`,
      JSON.stringify(payload),
      options
    );
  }

  private delete(url: string) {
    const options = { headers: this.createRequestHeader() };
    return this.http.delete(`${this.baseUrl}${this.prefix}${url}`, options);
  }

  private createRequestHeader() {
    // set headers here e.g.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }
}
