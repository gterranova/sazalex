// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from '@sazalex/ui';
import { DynamicPagesModule, DynamicPageComponent } from '@sazalex/dynamic-pages';
import { PathResolveService, TypeResolveService, PageResolveService } from './app-routing.service';

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
    resolve: { type: TypeResolveService, 'page-info': PageResolveService, context: PathResolveService },
    data: {}
  },
  {
    path: ':page/:id',
    pathMatch: 'full',
    component: DynamicPageComponent,
    resolve: { type: TypeResolveService, 'page-info': PageResolveService, context: PathResolveService },
    data: {}
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      "page-info": {
        title: 'Whoops... Page not found!',
        navigationAction: 'arrow_back',
        logo: 'assets/logo.png',
        backLink: '/',
        icon: 'info'  
      }
    }
  }
];


@NgModule({
  imports: [
    DynamicPagesModule,
    RouterModule.forRoot(routes, {
      // useHash: true,
      // scrollPositionRestoration: 'enabled',
      // preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [TypeResolveService, PageResolveService, PathResolveService],
  exports: [RouterModule]
})
export class AppRoutingModule {}
