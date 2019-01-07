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

export interface Page {
    type: string;
    title: string;
    slug: string;
    navigationAction: string;
    logo: string;
    backLink: string;
    icon: string;
    showAsPopupActionItem: boolean;
    showAsDrawerItem: boolean;
    actionBarHidden: boolean;
    actionItemsHidden: boolean;
    opacityTopScrollPosition: number;
    _id?: string;
}

export interface Attachments {
    label: string;
    path: string;
    _id?: string;
}

export interface News {
    category: string;
    date: string;
    title: string;
    excerpt: string;
    content: string;
    attachments: Attachments[];
    featured: boolean;
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
    header: string;
    slug: string;
    content: string;
    _id?: string;
}

export interface It {
    pages: Page[];
    news: News[];
    people: Person[];
    practices: Practice[];
    _id?: string;
}

export interface FileElement {
    name: string;
    slug: string;
    parent: string;
    isFolder: boolean;
    _id?: string;
}

export interface Root {
    users: User[];
    it: It;
    files: FileElement[];
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

    public getIt(params?: any): Observable<It> {
        return this.request('get', `/it`, params);
    }

    public getItSchema(params?: any): Observable<any> {
        return this.request('get', `/it`, { ...params, schema: true});
    }

    public setIt(value: It, params?: any): Observable<void> {
        return this.request('set', `/it`, value, params);
    }

    public updateIt(value: It, params?: any): Observable<It> {
        return this.request('update', `/it`, value, params);
    }

    public deleteIt(params?: any): Observable<void> {
        return this.request('delete', `/it`, params);
    }

    public pushItPages(value: Page, params?: any): Observable<Page> {
        return this.request('push', `/it/pages`, value, params);
    }

    public getAllItPages(params?: any): Observable<Page[]> {
        return this.request('get', `/it/pages`, params);
    }

    public getAllItPagesSchema(params?: any): Observable<any> {
        return this.request('get', `/it/pages`, { ...params, schema: true});
    }

    public setAllItPages(value: Page[], params?: any): Observable<void> {
        return this.request('set', `/it/pages`, value, params);
    }

    public deleteAllItPages(params?: any): Observable<void> {
        return this.request('delete', `/it/pages`, params);
    }

    public getItPages(pagesId: string, params?: any): Observable<Page> {
        return this.request('get', `/it/pages/${pagesId}`, params);
    }

    public getItPagesSchema(pagesId: string, params?: any): Observable<any> {
        return this.request('get', `/it/pages/${pagesId}`, { ...params, schema: true});
    }

    public setItPages(pagesId: string, value: Page, params?: any): Observable<void> {
        return this.request('set', `/it/pages/${pagesId}`, value, params);
    }

    public updateItPages(pagesId: string, value: Page, params?: any): Observable<Page> {
        return this.request('update', `/it/pages/${pagesId}`, value, params);
    }

    public deleteItPages(pagesId: string, params?: any): Observable<void> {
        return this.request('delete', `/it/pages/${pagesId}`, params);
    }

    public pushItNews(value: News, params?: any): Observable<News> {
        return this.request('push', `/it/news`, value, params);
    }

    public getAllItNews(params?: any): Observable<News[]> {
        return this.request('get', `/it/news`, params);
    }

    public getAllItNewsSchema(params?: any): Observable<any> {
        return this.request('get', `/it/news`, { ...params, schema: true});
    }

    public setAllItNews(value: News[], params?: any): Observable<void> {
        return this.request('set', `/it/news`, value, params);
    }

    public deleteAllItNews(params?: any): Observable<void> {
        return this.request('delete', `/it/news`, params);
    }

    public getItNews(newsId: string, params?: any): Observable<News> {
        return this.request('get', `/it/news/${newsId}`, params);
    }

    public getItNewsSchema(newsId: string, params?: any): Observable<any> {
        return this.request('get', `/it/news/${newsId}`, { ...params, schema: true});
    }

    public setItNews(newsId: string, value: News, params?: any): Observable<void> {
        return this.request('set', `/it/news/${newsId}`, value, params);
    }

    public updateItNews(newsId: string, value: News, params?: any): Observable<News> {
        return this.request('update', `/it/news/${newsId}`, value, params);
    }

    public deleteItNews(newsId: string, params?: any): Observable<void> {
        return this.request('delete', `/it/news/${newsId}`, params);
    }

    public pushItNewsAttachments(newsId: string, value: Attachments, params?: any): Observable<Attachments> {
        return this.request('push', `/it/news/${newsId}/attachments`, value, params);
    }

    public getAllItNewsAttachments(newsId: string, params?: any): Observable<Attachments[]> {
        return this.request('get', `/it/news/${newsId}/attachments`, params);
    }

    public getAllItNewsAttachmentsSchema(newsId: string, params?: any): Observable<any> {
        return this.request('get', `/it/news/${newsId}/attachments`, { ...params, schema: true});
    }

    public setAllItNewsAttachments(newsId: string, value: Attachments[], params?: any): Observable<void> {
        return this.request('set', `/it/news/${newsId}/attachments`, value, params);
    }

    public deleteAllItNewsAttachments(newsId: string, params?: any): Observable<void> {
        return this.request('delete', `/it/news/${newsId}/attachments`, params);
    }

    public getItNewsAttachments(newsId: string, attachmentsId: string, params?: any): Observable<Attachments> {
        return this.request('get', `/it/news/${newsId}/attachments/${attachmentsId}`, params);
    }

    public getItNewsAttachmentsSchema(newsId: string, attachmentsId: string, params?: any): Observable<any> {
        return this.request('get', `/it/news/${newsId}/attachments/${attachmentsId}`, { ...params, schema: true});
    }

    public setItNewsAttachments(newsId: string, attachmentsId: string, value: Attachments, params?: any): Observable<void> {
        return this.request('set', `/it/news/${newsId}/attachments/${attachmentsId}`, value, params);
    }

    public updateItNewsAttachments(newsId: string, attachmentsId: string, value: Attachments, params?: any): Observable<Attachments> {
        return this.request('update', `/it/news/${newsId}/attachments/${attachmentsId}`, value, params);
    }

    public deleteItNewsAttachments(newsId: string, attachmentsId: string, params?: any): Observable<void> {
        return this.request('delete', `/it/news/${newsId}/attachments/${attachmentsId}`, params);
    }

    public pushItPeople(value: Person, params?: any): Observable<Person> {
        return this.request('push', `/it/people`, value, params);
    }

    public getAllItPeople(params?: any): Observable<Person[]> {
        return this.request('get', `/it/people`, params);
    }

    public getAllItPeopleSchema(params?: any): Observable<any> {
        return this.request('get', `/it/people`, { ...params, schema: true});
    }

    public setAllItPeople(value: Person[], params?: any): Observable<void> {
        return this.request('set', `/it/people`, value, params);
    }

    public deleteAllItPeople(params?: any): Observable<void> {
        return this.request('delete', `/it/people`, params);
    }

    public getItPeople(peopleId: string, params?: any): Observable<Person> {
        return this.request('get', `/it/people/${peopleId}`, params);
    }

    public getItPeopleSchema(peopleId: string, params?: any): Observable<any> {
        return this.request('get', `/it/people/${peopleId}`, { ...params, schema: true});
    }

    public setItPeople(peopleId: string, value: Person, params?: any): Observable<void> {
        return this.request('set', `/it/people/${peopleId}`, value, params);
    }

    public updateItPeople(peopleId: string, value: Person, params?: any): Observable<Person> {
        return this.request('update', `/it/people/${peopleId}`, value, params);
    }

    public deleteItPeople(peopleId: string, params?: any): Observable<void> {
        return this.request('delete', `/it/people/${peopleId}`, params);
    }

    public pushItPeoplePractices(peopleId: string, value: string, params?: any): Observable<string> {
        return this.request('push', `/it/people/${peopleId}/practices`, value, params);
    }

    public getAllItPeoplePractices(peopleId: string, params?: any): Observable<string[]> {
        return this.request('get', `/it/people/${peopleId}/practices`, params);
    }

    public getAllItPeoplePracticesSchema(peopleId: string, params?: any): Observable<any> {
        return this.request('get', `/it/people/${peopleId}/practices`, { ...params, schema: true});
    }

    public setAllItPeoplePractices(peopleId: string, value: string[], params?: any): Observable<void> {
        return this.request('set', `/it/people/${peopleId}/practices`, value, params);
    }

    public deleteAllItPeoplePractices(peopleId: string, params?: any): Observable<void> {
        return this.request('delete', `/it/people/${peopleId}/practices`, params);
    }

    public pushItPractices(value: Practice, params?: any): Observable<Practice> {
        return this.request('push', `/it/practices`, value, params);
    }

    public getAllItPractices(params?: any): Observable<Practice[]> {
        return this.request('get', `/it/practices`, params);
    }

    public getAllItPracticesSchema(params?: any): Observable<any> {
        return this.request('get', `/it/practices`, { ...params, schema: true});
    }

    public setAllItPractices(value: Practice[], params?: any): Observable<void> {
        return this.request('set', `/it/practices`, value, params);
    }

    public deleteAllItPractices(params?: any): Observable<void> {
        return this.request('delete', `/it/practices`, params);
    }

    public getItPractices(practicesId: string, params?: any): Observable<Practice> {
        return this.request('get', `/it/practices/${practicesId}`, params);
    }

    public getItPracticesSchema(practicesId: string, params?: any): Observable<any> {
        return this.request('get', `/it/practices/${practicesId}`, { ...params, schema: true});
    }

    public setItPractices(practicesId: string, value: Practice, params?: any): Observable<void> {
        return this.request('set', `/it/practices/${practicesId}`, value, params);
    }

    public updateItPractices(practicesId: string, value: Practice, params?: any): Observable<Practice> {
        return this.request('update', `/it/practices/${practicesId}`, value, params);
    }

    public deleteItPractices(practicesId: string, params?: any): Observable<void> {
        return this.request('delete', `/it/practices/${practicesId}`, params);
    }

    public pushFiles(value: FileElement, params?: any): Observable<FileElement> {
        return this.request('push', `/files`, value, params);
    }

    public getAllFiles(params?: any): Observable<FileElement[]> {
        return this.request('get', `/files`, params);
    }

    public getAllFilesSchema(params?: any): Observable<any> {
        return this.request('get', `/files`, { ...params, schema: true});
    }

    public setAllFiles(value: FileElement[], params?: any): Observable<void> {
        return this.request('set', `/files`, value, params);
    }

    public deleteAllFiles(params?: any): Observable<void> {
        return this.request('delete', `/files`, params);
    }

    public getFiles(filesId: string, params?: any): Observable<FileElement> {
        return this.request('get', `/files/${filesId}`, params);
    }

    public getFilesSchema(filesId: string, params?: any): Observable<any> {
        return this.request('get', `/files/${filesId}`, { ...params, schema: true});
    }

    public setFiles(filesId: string, value: FileElement, params?: any): Observable<void> {
        return this.request('set', `/files/${filesId}`, value, params);
    }

    public updateFiles(filesId: string, value: FileElement, params?: any): Observable<FileElement> {
        return this.request('update', `/files/${filesId}`, value, params);
    }

    public deleteFiles(filesId: string, params?: any): Observable<void> {
        return this.request('delete', `/files/${filesId}`, params);
    }

    protected abstract request(method: string, itemPath: string, value?: any, params?: any);
}
