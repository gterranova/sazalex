// tslint:disable:variable-name interface-name no-return-await no-any no-reserved-keywords prefer-template
import { Observable } from 'rxjs';

export interface User {
  email: string;
  password: string;
  name: string;
  surname: string;
  superuser: boolean;
  _id?: string;
}

export interface News {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  slug: string;
  _id?: string;
}

export interface Person {
  name: string;
  surname: string;
  role: string;
  slug: string;
  phone: string;
  email: string;
  image: string;
  practices: string[];
  bio: string;
  position: number;
  _id?: string;
}

export interface Practice {
  name: string;
  slug: string;
  content: string;
  _id?: string;
}

export interface Root {
  users: User[];
  news: News[];
  people: Person[];
  practices: Practice[];
  _id?: string;
}

export abstract class BaseApi {
  public getRoot(): Observable<Root> {
    return this.request('get', ``);
  }

  public getRootSchema(): Observable<any> {
    return this.request('get', `?schema=1`);
  }

  public setRoot(value: Root): Observable<void> {
    return this.request('set', ``, value);
  }

  public updateRoot(value: Root): Observable<Root> {
    return this.request('update', ``, value);
  }

  public deleteRoot(): Observable<void> {
    return this.request('delete', ``);
  }

  public pushUsers(value: User): Observable<User> {
    return this.request('push', `/users`, value);
  }

  public getAllUsers(): Observable<User[]> {
    return this.request('get', `/users`);
  }

  public getAllUsersSchema(): Observable<any> {
    return this.request('get', `/users?schema=1`);
  }

  public setAllUsers(value: User[]): Observable<void> {
    return this.request('set', `/users`, value);
  }

  public deleteAllUsers(): Observable<void> {
    return this.request('delete', `/users`);
  }

  public getUsers(usersId: string): Observable<User> {
    return this.request('get', `/users/${usersId}`);
  }

  public getUsersSchema(usersId: string): Observable<any> {
    return this.request('get', `/users/${usersId}?schema=1`);
  }

  public setUsers(usersId: string, value: User): Observable<void> {
    return this.request('set', `/users/${usersId}`, value);
  }

  public updateUsers(usersId: string, value: User): Observable<User> {
    return this.request('update', `/users/${usersId}`, value);
  }

  public deleteUsers(usersId: string): Observable<void> {
    return this.request('delete', `/users/${usersId}`);
  }

  public pushNews(value: News): Observable<News> {
    return this.request('push', `/news`, value);
  }

  public getAllNews(): Observable<News[]> {
    return this.request('get', `/news`);
  }

  public getAllNewsSchema(): Observable<any> {
    return this.request('get', `/news?schema=1`);
  }

  public setAllNews(value: News[]): Observable<void> {
    return this.request('set', `/news`, value);
  }

  public deleteAllNews(): Observable<void> {
    return this.request('delete', `/news`);
  }

  public getNews(newsId: string): Observable<News> {
    return this.request('get', `/news/${newsId}`);
  }

  public getNewsSchema(newsId: string): Observable<any> {
    return this.request('get', `/news/${newsId}?schema=1`);
  }

  public setNews(newsId: string, value: News): Observable<void> {
    return this.request('set', `/news/${newsId}`, value);
  }

  public updateNews(newsId: string, value: News): Observable<News> {
    return this.request('update', `/news/${newsId}`, value);
  }

  public deleteNews(newsId: string): Observable<void> {
    return this.request('delete', `/news/${newsId}`);
  }

  public pushPeople(value: Person): Observable<Person> {
    return this.request('push', `/people`, value);
  }

  public getAllPeople(): Observable<Person[]> {
    return this.request('get', `/people`);
  }

  public getAllPeopleSchema(): Observable<any> {
    return this.request('get', `/people?schema=1`);
  }

  public setAllPeople(value: Person[]): Observable<void> {
    return this.request('set', `/people`, value);
  }

  public deleteAllPeople(): Observable<void> {
    return this.request('delete', `/people`);
  }

  public getPeople(peopleId: string): Observable<Person> {
    return this.request('get', `/people/${peopleId}`);
  }

  public getPeopleSchema(peopleId: string): Observable<any> {
    return this.request('get', `/people/${peopleId}?schema=1`);
  }

  public setPeople(peopleId: string, value: Person): Observable<void> {
    return this.request('set', `/people/${peopleId}`, value);
  }

  public updatePeople(peopleId: string, value: Person): Observable<Person> {
    return this.request('update', `/people/${peopleId}`, value);
  }

  public deletePeople(peopleId: string): Observable<void> {
    return this.request('delete', `/people/${peopleId}`);
  }

  public pushPractices(value: Practice): Observable<Practice> {
    return this.request('push', `/practices`, value);
  }

  public getAllPractices(): Observable<Practice[]> {
    return this.request('get', `/practices`);
  }

  public getAllPracticesSchema(): Observable<any> {
    return this.request('get', `/practices?schema=1`);
  }

  public setAllPractices(value: Practice[]): Observable<void> {
    return this.request('set', `/practices`, value);
  }

  public deleteAllPractices(): Observable<void> {
    return this.request('delete', `/practices`);
  }

  public getPractices(practicesId: string): Observable<Practice> {
    return this.request('get', `/practices/${practicesId}`);
  }

  public getPracticesSchema(practicesId: string): Observable<any> {
    return this.request('get', `/practices/${practicesId}?schema=1`);
  }

  public setPractices(practicesId: string, value: Practice): Observable<void> {
    return this.request('set', `/practices/${practicesId}`, value);
  }

  public updatePractices(
    practicesId: string,
    value: Practice
  ): Observable<Practice> {
    return this.request('update', `/practices/${practicesId}`, value);
  }

  public deletePractices(practicesId: string): Observable<void> {
    return this.request('delete', `/practices/${practicesId}`);
  }

  protected abstract request(method: string, itemPath: string, value?: any);
}
