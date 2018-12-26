import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { DatasourceService, Page } from '@sazalex/datasource';
import { of } from 'rxjs';

// import { HomeComponent } from './pages/home/home/home.component';
// import { AboutComponent } from './pages/about/about/about.component';
/**
 * Define app module routes here, e.g., to lazily load a module
 * (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
 */
@Injectable({
  providedIn: 'root'
})
export class PathResolveService implements Resolve<any> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { page, id} = route.params;
    if (page !== undefined) {
      let path = `/${page}`;
      if (id !== undefined) {
        path = `${path}/${id}`;
      }
      return this.dataSourceService.request('get', path);
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
        return `${page}-detail`;
      }
      return `${page}-page`;
    }
    return 'default-page';
  }
}

@Injectable({
  providedIn: 'root'
})
export class PageResolveService implements Resolve<Page> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { page, id} = route.params;
    if (page !== undefined) {
      if (id !== undefined) {
        return this.dataSourceService.getPages(`${page}-detail`);
      }
      return this.dataSourceService.getPages(`${page}-page`);
    }
    return this.dataSourceService.getPages('default-page');
  }
}

