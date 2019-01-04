import { Injectable, PLATFORM_ID, Inject, Optional } from '@angular/core';
import { MockData } from './mock-datasource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApi, News, Person, Practice } from './base-api';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService extends BaseApi {
  private baseUrl = '';
  private prefix = '/api';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, 
  @Optional() @Inject('serverUrl') protected serverUrl: string) {
    super();
    this.baseUrl = isPlatformBrowser(this.platformId)? this.baseUrl : this.serverUrl;
  }
  /*
  public getAllNews(params?: any): Observable<News[]> {
    return <Observable<News[]>>of(MockData['news']);
  }

  public getNews(newsId: string, params?: any): Observable<News> {
    return <Observable<News>>of(MockData['news'].find(d => d._id === newsId));
  }

  public getAllPeople(params?: any): Observable<Person[]> {
    return <Observable<Person[]>>of(MockData['people']);
  }
  public getPeople(peopleId: string, params?: any): Observable<Person> {
    return <Observable<Person>>of(MockData['people'].find(d => d._id === peopleId));
  }

  public getAllPractices(params?: any): Observable<Practice[]> {
    return <Observable<Practice[]>>of(MockData['practices']);
  }

  public getPractices(practicesId: string, params?: any): Observable<Practice> {
    return <Observable<Practice>>of(MockData['practices'].find(d => d._id === practicesId));
  }
  */
  private createRequestHeader() {
    // set headers here e.g.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }

  public request(
    method: 'get' | 'push' | 'set' | 'update' | 'delete',
    itemPath: string,
    ...args: any[]
  ) {
    let params, value;
    if (method === 'get' || method === 'delete' && args.length > 0) {
      params = args.pop();
    } else if (args.length > 1) {
      params = args.pop();
    }
    if (args.length > 0) {
      value = args.shift();
    }
    const options = { headers: this.createRequestHeader(), params };
    switch (method) {
      case 'get':
        return this.http.get(
          `${this.baseUrl}${this.prefix}${itemPath}`,
          options
        );
      case 'push':
        return this.http.post(
          `${this.baseUrl}${this.prefix}${itemPath}`,
          JSON.stringify(value),
          options
        );
      case 'set':
        return this.http.put(
          `${this.baseUrl}${this.prefix}${itemPath}`,
          JSON.stringify(value),
          options
        );
      case 'update':
        return this.http.patch(
          `${this.baseUrl}${this.prefix}${itemPath}`,
          JSON.stringify(value),
          options
        );
      case 'delete':
        return this.http.delete(
          `${this.baseUrl}${this.prefix}${itemPath}`,
          options
        );
      default:
    }
    throw new Error(`Unknown method ${method}`);
  }
}
