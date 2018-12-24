// angular
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '@sazalex/ui';
import { Routes } from '@angular/router';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '@sazalex/auth';

// app
export const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    data: {
      title: 'Dashboard',
      navigationAction: 'menu',
      icon: 'home',
      showAsPopupActionItem: false,
      showAsDrawerItem: true,
      actionBarHidden: false,
      actionItemsHidden: false
    }
  },
  {
    path: 'users',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './users/users.module#UsersModule',
    data: {
      title: 'Users',
      navigationAction: 'arrow_back',
      icon: 'users',
      backLink: '/',
      showAsPopupActionItem: false,
      showAsDrawerItem: true,
      actionBarHidden: false,
      actionItemsHidden: false
    }
  },
  {
    path: 'people',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './people/people.module#PeopleModule',
    data: {
      title: 'Professionals',
      navigationAction: 'arrow_back',
      icon: 'users',
      backLink: '/',
      showAsPopupActionItem: false,
      showAsDrawerItem: true,
      actionBarHidden: false,
      actionItemsHidden: false
    }
  },
  {
    path: 'practices',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './practices/practices.module#PracticesModule',
    data: {
      title: 'Practice Areas',
      navigationAction: 'arrow_back',
      icon: 'info',
      backLink: '/',
      showAsPopupActionItem: false,
      showAsDrawerItem: true,
      actionBarHidden: false,
      actionItemsHidden: false
    }
  },
  {
    path: 'news',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './news/news.module#NewsModule',
    data: {
      title: 'News',
      navigationAction: 'arrow_back',
      icon: 'info',
      backLink: '/',
      showAsPopupActionItem: false,
      showAsDrawerItem: true,
      actionBarHidden: false,
      actionItemsHidden: false
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes, {
      // useHash: true,
      // scrollPositionRestoration: 'enabled',
      // preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
