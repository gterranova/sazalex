import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { News, DatasourceService } from '@sazalex/datasource';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsListResolveService implements Resolve<News[]> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataSourceService.getAllNews();
  }
}

@Injectable({
  providedIn: 'root'
})
export class NewsDetailsResolveService implements Resolve<News> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    if (id !== undefined) {
      return this.dataSourceService.getNews(id);
    }
    return of(<News>{});
  }
}

@Injectable({
  providedIn: 'root'
})
export class NewsSchemaDetailsResolveService implements Resolve<any> {
  constructor(private dataSourceService: DatasourceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    return this.dataSourceService.getNewsSchema(id || '0');
  }
}
