// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from '@sazalex/ui';
import { DynamicPagesModule, DynamicPageComponent } from '@sazalex/dynamic-pages';
import { PathResolveService, PathSchemaResolveService, TypeResolveService, PageResolveService, HomeGuard } from './app-routing.service';

// app
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [HomeGuard],
    component: DynamicPageComponent
  },
  {
    path: 'en/:page',
    pathMatch: 'full',
    component: DynamicPageComponent,
    resolve: { type: TypeResolveService, pageInfo: PageResolveService, context: PathResolveService },
    data: {}
  },
  {
    path: 'en/:page/:id',
    pathMatch: 'full',
    component: DynamicPageComponent,
    resolve: { type: TypeResolveService, pageInfo: PageResolveService, context: PathResolveService, 
      schema: PathSchemaResolveService },
    data: {}
  },
  {
    path: 'it',
    pathMatch: 'full',
    redirectTo: '/it/home'
  },
  {
    path: 'it/:page',
    pathMatch: 'full',
    component: DynamicPageComponent,
    resolve: { type: TypeResolveService, pageInfo: PageResolveService, context: PathResolveService },
    data: {}
  },
  {
    path: 'it/:page/:id',
    pathMatch: 'full',
    component: DynamicPageComponent,
    resolve: { type: TypeResolveService, pageInfo: PageResolveService, context: PathResolveService, 
      schema: PathSchemaResolveService },
    data: {}
  },
  {
    path: '**',
    redirectTo: '/en/page-not-found'
  }
];


@NgModule({
  imports: [
    DynamicPagesModule,
    RouterModule.forRoot(routes, {
      // useHash: true,
      // scrollPositionRestoration: 'enabled',
      // preloadingStrategy: PreloadAllModules
      onSameUrlNavigation: 'reload'
    })
  ],
  providers: [TypeResolveService, PageResolveService, PathResolveService, PathSchemaResolveService, HomeGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
