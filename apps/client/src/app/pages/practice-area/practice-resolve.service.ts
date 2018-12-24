import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { DatasourceService, Practice } from '@sazalex/datasource';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PracticeListResolveService implements Resolve<Practice[]> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataSourceService.getAllPractices();
  }
}

@Injectable({
  providedIn: 'root'
})
export class PracticeDetailsResolveService implements Resolve<Practice> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    if (id !== undefined) {
      return this.dataSourceService.getPractices(id);
    }
    return of(<Practice>{});
  }
}
