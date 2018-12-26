import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { Page, DatasourceService } from '@sazalex/datasource';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesResolveService implements Resolve<Page|Page[]> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const {id} = route.params;
    if (id !== undefined) {
      return this.dataSourceService.getPages(id);
    }
    return this.dataSourceService.getAllPages();
  }
}

@Injectable({
  providedIn: 'root'
})
export class PagesSchemaDetailsResolveService implements Resolve<any> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const {id} = route.params;
    return this.dataSourceService.getPagesSchema(id || '0');
  }
}
