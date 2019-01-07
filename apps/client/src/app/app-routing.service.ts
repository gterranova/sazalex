import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DatasourceService, Page } from '@sazalex/datasource';
import { of } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { tap, map, switchMap } from 'rxjs/operators';
import {isPlatformServer} from "@angular/common";
import { TranslateService } from '@ngx-translate/core';

const PAGE_DATA_KEY = makeStateKey('page_data');
const PAGE_INFO_KEY = makeStateKey('page_info');


@Injectable()
export class HomeGuard implements CanActivate {
  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  canActivate() {
    this.router.navigate([this.translate.currentLang || 'it', 'home']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PathResolveService implements Resolve<any> {
  constructor(
    private dataSourceService: DatasourceService, 
    private state: TransferState,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId) {}

  getPageData(path: string) {
    const found = this.state.hasKey(PAGE_DATA_KEY);
    if (found) {
      const pageData = this.state.get(PAGE_DATA_KEY, {});
      if (pageData[path]) {
        //console.log("Restore state", pageData[path]);
        this.state.remove(PAGE_DATA_KEY);
        return of(pageData[path]);  
      }
    }
    return this.dataSourceService.request('get', path).pipe( tap((results: any) => {
      if (isPlatformServer(this.platformId)) {
        //console.log("Saving state", {[path]: results });
        this.state.set(PAGE_DATA_KEY, {[path]: results });
      }
    }));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { page, id} = route.params;
    let lang;

    if (page !== undefined) {
      if (/^\/(en|it)/.test(state.url)) {
        lang = state.url.match(/^\/(en|it)/)[1];
      } else {
        lang = this.translate.currentLang || this.translate.defaultLang;
      }
      let path = `/${lang}/${page}`;
      if (id !== undefined) {
        path = `${path}/${id}`;
      }
      if (this.translate.currentLang !== lang) {
        //console.log("Setting language", lang);
        this.translate.use(lang);
      }
      return this.getPageData(path)
    }
    return of({});
  }
}

@Injectable({
  providedIn: 'root'
})
export class TypeResolveService implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { page, id} = route.params;
    if (page !== undefined) {
      if (id !== undefined) {
        return of(`${page}-detail`);
      }
      return of(`${page}-page`);
    }
    return of('default-page');
  }
}

@Injectable({
  providedIn: 'root'
})
export class PageResolveService implements Resolve<any> {
  constructor(
    private dataSourceService: DatasourceService, 
    private state: TransferState,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { page, id} = route.params;
    let lang, pageName; 
    if (page !== undefined) {
      pageName = (id !== undefined) ? `${page}-detail` : `${page}-page`;
    } else {
      pageName = 'default-page';
    }
    
    if (/^\/(en|it)/.test(state.url)) {
      lang = state.url.match(/^\/(en|it)/)[1];
    } else {
      lang = this.translate.currentLang || this.translate.defaultLang;
    }
    if (this.translate.currentLang !== lang) {
      //console.log("Setting language", lang);
      this.translate.use(lang);
    }
    const found = this.state.hasKey(PAGE_INFO_KEY);
    if (found) {
      const pageInfo = this.state.get(PAGE_INFO_KEY, {});
      if (pageInfo[pageName]) {
        //console.log("Restore state", pageInfo[pageName]);
        this.state.remove(PAGE_INFO_KEY);
        return of(pageInfo[pageName]);    
      }
    }
    return this.dataSourceService.getPages(pageName, undefined, lang).pipe( tap((results: any) => {
      if (isPlatformServer(this.platformId)) {
        this.state.set(PAGE_INFO_KEY, { [pageName]: results });
        //console.log("Saving state", { [pageName]: results });
      }
    }));
  }
}

