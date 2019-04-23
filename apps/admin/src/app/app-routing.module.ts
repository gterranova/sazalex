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
      pageInfo: {
        title: 'Dashboard',
        navigationAction: 'menu',
        icon: 'home',
        showAsPopupActionItem: false,
        showAsDrawerItem: true,
        actionBarHidden: false,
        actionItemsHidden: false  
      }
    }
  },
  {
    path: 'users',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './users/users.module#UsersModule',
    data: {
      pageInfo: {
        title: 'Users',
        navigationAction: 'arrow_back',
        icon: 'users',
        backLink: '/',
        showAsPopupActionItem: false,
        showAsDrawerItem: true,
        actionBarHidden: false,
        actionItemsHidden: false
      }
    }
  },
  {
    path: 'it/pages',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './pages/pages.module#PagesModule',
    data: {
      pageInfo: {
        title: 'Pages',
        navigationAction: 'arrow_back',
        icon: 'users',
        backLink: '/',
        showAsPopupActionItem: false,
        showAsDrawerItem: true,
        actionBarHidden: false,
        actionItemsHidden: false
      }
    }
  },
  {
    path: 'en/pages',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './pages/pages.module#PagesModule',
    data: {
      pageInfo: {
        title: 'Pages',
        navigationAction: 'arrow_back',
        icon: 'users',
        backLink: '/',
        showAsPopupActionItem: false,
        showAsDrawerItem: true,
        actionBarHidden: false,
        actionItemsHidden: false
      }
    }
  },
  {
    path: 'it/people',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './people/people.module#PeopleModule',
    data: {
      pageInfo: {
        title: 'Professionals',
        navigationAction: 'arrow_back',
        icon: 'users',
        backLink: '/',
        showAsPopupActionItem: false,
        showAsDrawerItem: true,
        actionBarHidden: false,
        actionItemsHidden: false
      }
    }
  },
  {
    path: 'en/people',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './people/people.module#PeopleModule',
    data: {
      pageInfo: {
        title: 'Professionals',
        navigationAction: 'arrow_back',
        icon: 'users',
        backLink: '/',
        showAsPopupActionItem: false,
        showAsDrawerItem: true,
        actionBarHidden: false,
        actionItemsHidden: false
      }
    }
  },
  {
    path: 'it/practices',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './practices/practices.module#PracticesModule',
    data: {
      pageInfo: {
        title: 'Practice Areas',
        navigationAction: 'arrow_back',
        icon: 'info',
        backLink: '/',
        showAsPopupActionItem: false,
        showAsDrawerItem: true,
        actionBarHidden: false,
        actionItemsHidden: false
      }
    }
  },
  {
    path: 'en/practices',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './practices/practices.module#PracticesModule',
    data: {
      pageInfo: {
        title: 'Practice Areas',
        navigationAction: 'arrow_back',
        icon: 'info',
        backLink: '/',
        showAsPopupActionItem: false,
        showAsDrawerItem: true,
        actionBarHidden: false,
        actionItemsHidden: false
      }
    }
  },
  {
    path: 'it/news',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './news/news.module#NewsModule',
    data: {
      pageInfo: {
        title: 'News',
        navigationAction: 'arrow_back',
        icon: 'info',
        backLink: '/',
        showAsPopupActionItem: false,
        showAsDrawerItem: true,
        actionBarHidden: false,
        actionItemsHidden: false
      }
    }
  },
  {
    path: 'en/news',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './news/news.module#NewsModule',
    data: {
      pageInfo: {
        title: 'News',
        navigationAction: 'arrow_back',
        icon: 'info',
        backLink: '/',
        showAsPopupActionItem: false,
        showAsDrawerItem: true,
        actionBarHidden: false,
        actionItemsHidden: false
      }
    }
  },
  {
    path: 'files',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    loadChildren: './files/files.module#FilesModule',
    data: {
      pageInfo: {
        title: 'Files',
        navigationAction: 'arrow_back',
        icon: 'info',
        backLink: '/',
        showAsPopupActionItem: false,
        showAsDrawerItem: true,
        actionBarHidden: false,
        actionItemsHidden: false
      }
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
