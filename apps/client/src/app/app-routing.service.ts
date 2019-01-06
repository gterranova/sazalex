import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DatasourceService, Page } from '@sazalex/datasource';
import { of } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import {isPlatformServer} from "@angular/common";

const PAGE_DATA_KEY = makeStateKey('page_data');
const PAGE_INFO_KEY = makeStateKey('page_info');

@Injectable({
  providedIn: 'root'
})
export class PathResolveService implements Resolve<any> {
  constructor(
    private dataSourceService: DatasourceService, 
    private state: TransferState,
    @Inject(PLATFORM_ID) private platformId) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { page, id} = route.params;
    if (page !== undefined) {
      let path = `/${page}`;
      if (id !== undefined) {
        path = `${path}/${id}`;
      }
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
    @Inject(PLATFORM_ID) private platformId) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { page, id} = route.params;
    let pageName; 
    if (page !== undefined) {
      pageName = (id !== undefined) ? `${page}-detail` : `${page}-page`;
    } else {
      pageName = 'default-page';
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
    return this.dataSourceService.getPages(pageName).pipe( tap((results: any) => {
      if (isPlatformServer(this.platformId)) {
        this.state.set(PAGE_INFO_KEY, { [pageName]: results });
        //console.log("Saving state", { [pageName]: results });
      }
    }));
  }
}

