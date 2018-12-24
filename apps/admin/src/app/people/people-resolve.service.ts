import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { Person, DatasourceService } from '@sazalex/datasource';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleListResolveService implements Resolve<Person[]> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataSourceService.getAllPeople();
  }
}

@Injectable({
  providedIn: 'root'
})
export class PeopleDetailsResolveService implements Resolve<Person> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    if (id !== undefined) {
      return this.dataSourceService.getPeople(id);
    }
    return of(<Person>{});
  }
}

@Injectable({
  providedIn: 'root'
})
export class PeopleSchemaDetailsResolveService implements Resolve<any> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    return this.dataSourceService.getPeopleSchema(id || '0');
  }
}
