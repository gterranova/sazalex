import { Injectable, PLATFORM_ID, Inject, Optional } from '@angular/core';
import { MockData } from './mock-datasource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApi, News, Person, Practice, Page } from './base-api';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService extends BaseApi {
  private baseUrl = '';
  private prefix = '/api';

  constructor(
    private http: HttpClient, 
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
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
  public getAllPages(params?: any, lang?: string): Observable<Page[]> {
    return <Observable<Page[]>>this.request('get', `/${lang || this.translate.currentLang}/pages`, params);
  }

  public getAllPagesSchema(params?: any, lang?: string): Observable<any> {
    return this.request('get', `/${lang || this.translate.currentLang}/pages`, { ...params, schema: true});
  }

  public getPages(pagesId: string, params?: any, lang?: string): Observable<Page> {
      return <Observable<Page>>this.request('get', `/${lang || this.translate.currentLang}/pages/${pagesId}`, params);
  }

  public getPagesSchema(pagesId: string, params?: any, lang?: string): Observable<any> {
      return this.request('get', `/${lang || this.translate.currentLang}/pages/${pagesId}`, { ...params, schema: true});
  }

  public getAllNews(params?: any, lang?: string): Observable<News[]> {    
    return <Observable<News[]>>this.request('get', `/${lang || this.translate.currentLang}/news`, params);
  }

  public getAllNewsSchema(params?: any, lang?: string): Observable<any> {
    return this.request('get', `/${lang || this.translate.currentLang}/news`, { ...params, schema: true});
  }

  public getNews(newsId: string, params?: any, lang?: string): Observable<News> {
      return <Observable<News>>this.request('get', `/${lang || this.translate.currentLang}/news/${newsId}`, params);
  }

  public getNewsSchema(newsId: string, params?: any, lang?: string): Observable<any> {
      return this.request('get', `/${lang || this.translate.currentLang}/news/${newsId}`, { ...params, schema: true});
  }

  public getAllPractices(params?: any, lang?: string): Observable<Practice[]> {    
    return <Observable<Practice[]>>this.request('get', `/${lang || this.translate.currentLang}/practices`, params);
  }

  public getAllNewsPractices(params?: any, lang?: string): Observable<any> {
    return this.request('get', `/${lang || this.translate.currentLang}/practices`, { ...params, schema: true});
  }

  public getPractices(practiceId: string, params?: any, lang?: string): Observable<Practice> {
      return <Observable<Practice>>this.request('get', `/${lang || this.translate.currentLang}/practices/${practiceId}`, params);
  }

  public getPracticesSchema(practiceId: string, params?: any, lang?: string): Observable<any> {
      return this.request('get', `/${lang || this.translate.currentLang}/practices/${practiceId}`, { ...params, schema: true});
  }

  public getAllPeople(params?: any, lang?: string): Observable<Person[]> {
    return <Observable<Person[]>>this.request('get', `/${lang || this.translate.currentLang}/people`, params);
  }

  public getAllPeopleSchema(params?: any, lang?: string): Observable<any> {
    return this.request('get', `/${lang || this.translate.currentLang}/people`, { ...params, schema: true});
  }

  public getPeople(peopleId: string, params?: any, lang?: string): Observable<Person> {
      return <Observable<Person>>this.request('get', `/${lang || this.translate.currentLang}/people/${peopleId}`, params);
  }

  public getPeopleSchema(peopleId: string, params?: any, lang?: string): Observable<any> {
      return this.request('get', `/${lang || this.translate.currentLang}/people/${peopleId}`, { ...params, schema: true});
  }

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
