// tslint:disable:variable-name interface-name no-return-await no-any no-reserved-keywords prefer-template
import { Observable } from "rxjs";

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
    public getRoot(params?: any): Observable<Root> {
        return this.request('get', ``, params);
    }

    public getRootSchema(params?: any): Observable<any> {
        return this.request('get', ``, { ...params, schema: true});
    }

    public setRoot(value: Root, params?: any): Observable<void> {
        return this.request('set', ``, value, params);
    }

    public updateRoot(value: Root, params?: any): Observable<Root> {
        return this.request('update', ``, value, params);
    }

    public deleteRoot(params?: any): Observable<void> {
        return this.request('delete', ``, params);
    }

    public pushUsers(value: User, params?: any): Observable<User> {
        return this.request('push', `/users`, value, params);
    }

    public getAllUsers(params?: any): Observable<User[]> {
        return this.request('get', `/users`, params);
    }

    public getAllUsersSchema(params?: any): Observable<any> {
        return this.request('get', `/users`, { ...params, schema: true});
    }

    public setAllUsers(value: User[], params?: any): Observable<void> {
        return this.request('set', `/users`, value, params);
    }

    public deleteAllUsers(params?: any): Observable<void> {
        return this.request('delete', `/users`, params);
    }

    public getUsers(usersId: string, params?: any): Observable<User> {
        return this.request('get', `/users/${usersId}`, params);
    }

    public getUsersSchema(usersId: string, params?: any): Observable<any> {
        return this.request('get', `/users/${usersId}`, { ...params, schema: true});
    }

    public setUsers(usersId: string, value: User, params?: any): Observable<void> {
        return this.request('set', `/users/${usersId}`, value, params);
    }

    public updateUsers(usersId: string, value: User, params?: any): Observable<User> {
        return this.request('update', `/users/${usersId}`, value, params);
    }

    public deleteUsers(usersId: string, params?: any): Observable<void> {
        return this.request('delete', `/users/${usersId}`, params);
    }

    public pushNews(value: News, params?: any): Observable<News> {
        return this.request('push', `/news`, value, params);
    }

    public getAllNews(params?: any): Observable<News[]> {
        return this.request('get', `/news`, params);
    }

    public getAllNewsSchema(params?: any): Observable<any> {
        return this.request('get', `/news`, { ...params, schema: true});
    }

    public setAllNews(value: News[], params?: any): Observable<void> {
        return this.request('set', `/news`, value, params);
    }

    public deleteAllNews(params?: any): Observable<void> {
        return this.request('delete', `/news`, params);
    }

    public getNews(newsId: string, params?: any): Observable<News> {
        return this.request('get', `/news/${newsId}`, params);
    }

    public getNewsSchema(newsId: string, params?: any): Observable<any> {
        return this.request('get', `/news/${newsId}`, { ...params, schema: true});
    }

    public setNews(newsId: string, value: News, params?: any): Observable<void> {
        return this.request('set', `/news/${newsId}`, value, params);
    }

    public updateNews(newsId: string, value: News, params?: any): Observable<News> {
        return this.request('update', `/news/${newsId}`, value, params);
    }

    public deleteNews(newsId: string, params?: any): Observable<void> {
        return this.request('delete', `/news/${newsId}`, params);
    }

    public pushPeople(value: Person, params?: any): Observable<Person> {
        return this.request('push', `/people`, value, params);
    }

    public getAllPeople(params?: any): Observable<Person[]> {
        return this.request('get', `/people`, params);
    }

    public getAllPeopleSchema(params?: any): Observable<any> {
        return this.request('get', `/people`, { ...params, schema: true});
    }

    public setAllPeople(value: Person[], params?: any): Observable<void> {
        return this.request('set', `/people`, value, params);
    }

    public deleteAllPeople(params?: any): Observable<void> {
        return this.request('delete', `/people`, params);
    }

    public getPeople(peopleId: string, params?: any): Observable<Person> {
        return this.request('get', `/people/${peopleId}`, params);
    }

    public getPeopleSchema(peopleId: string, params?: any): Observable<any> {
        return this.request('get', `/people/${peopleId}`, { ...params, schema: true});
    }

    public setPeople(peopleId: string, value: Person, params?: any): Observable<void> {
        return this.request('set', `/people/${peopleId}`, value, params);
    }

    public updatePeople(peopleId: string, value: Person, params?: any): Observable<Person> {
        return this.request('update', `/people/${peopleId}`, value, params);
    }

    public deletePeople(peopleId: string, params?: any): Observable<void> {
        return this.request('delete', `/people/${peopleId}`, params);
    }

    public pushPractices(value: Practice, params?: any): Observable<Practice> {
        return this.request('push', `/practices`, value, params);
    }

    public getAllPractices(params?: any): Observable<Practice[]> {
        return this.request('get', `/practices`, params);
    }

    public getAllPracticesSchema(params?: any): Observable<any> {
        return this.request('get', `/practices`, { ...params, schema: true});
    }

    public setAllPractices(value: Practice[], params?: any): Observable<void> {
        return this.request('set', `/practices`, value, params);
    }

    public deleteAllPractices(params?: any): Observable<void> {
        return this.request('delete', `/practices`, params);
    }

    public getPractices(practicesId: string, params?: any): Observable<Practice> {
        return this.request('get', `/practices/${practicesId}`, params);
    }

    public getPracticesSchema(practicesId: string, params?: any): Observable<any> {
        return this.request('get', `/practices/${practicesId}`, { ...params, schema: true});
    }

    public setPractices(practicesId: string, value: Practice, params?: any): Observable<void> {
        return this.request('set', `/practices/${practicesId}`, value, params);
    }

    public updatePractices(practicesId: string, value: Practice, params?: any): Observable<Practice> {
        return this.request('update', `/practices/${practicesId}`, value, params);
    }

    public deletePractices(practicesId: string, params?: any): Observable<void> {
        return this.request('delete', `/practices/${practicesId}`, params);
    }

    protected abstract request(method: string, itemPath: string, value?: any, params?: any);
}