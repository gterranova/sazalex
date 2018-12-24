import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { Practice, DatasourceService } from '@sazalex/datasource';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PracticesListResolveService implements Resolve<Practice[]> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataSourceService.getAllPractices();
  }
}

@Injectable({
  providedIn: 'root'
})
export class PracticesDetailsResolveService implements Resolve<Practice> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    if (id !== undefined) {
      return this.dataSourceService.getPractices(id);
    }
    return of(<Practice>{});
  }
}

@Injectable({
  providedIn: 'root'
})
export class PracticesSchemaDetailsResolveService implements Resolve<any> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    return this.dataSourceService.getPracticesSchema(id || '0');
  }
}
