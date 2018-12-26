// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeResolveService, PageResolveService, PathResolveService } from './app.service';
import { PageNotFoundComponent } from '@sazalex/ui';
import { DynamicPageComponent } from '@sazalex/dynamic-pages';

// app
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: ':page',
    pathMatch: 'full',
    component: DynamicPageComponent,
    resolve: { type: TypeResolveService, 'page-info': PageResolveService, context: PathResolveService }
  },
  {
    path: ':page/:id',
    pathMatch: 'full',
    component: DynamicPageComponent,
    resolve: { type: TypeResolveService, 'page-info': PageResolveService, context: PathResolveService }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'Whoops... Page not found!',
      navigationAction: 'arrow_back',
      logo: 'assets/logo.png',
      backLink: '/',
      icon: 'info'
    }
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash: true,
      // scrollPositionRestoration: 'enabled',
      // preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
