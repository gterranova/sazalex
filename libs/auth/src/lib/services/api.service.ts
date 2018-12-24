import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

import { User } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private baseUrl = '';
  private prefix = '/api';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getCurrentUser(): Observable<User> {
    return this.authenticationService.currentUser();
  }

  getUsers(): Observable<User[]> {
    // get users from api
    return this.get('/users').pipe(map((response: User[]) => response));
  }

  private get(url: string) {
    return this.http.get(`${this.baseUrl}${this.prefix}${url}/`);
  }

  private post(url: string, payload: any) {
    return this.http.post(
      `${this.baseUrl}${this.prefix}${url}/`,
      JSON.stringify(payload)
    );
  }
}
