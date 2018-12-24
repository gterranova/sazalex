import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '@sazalex/ui';

// import { HomeComponent } from './pages/home/home/home.component';
// import { AboutComponent } from './pages/about/about/about.component';
/**
 * Define app module routes here, e.g., to lazily load a module
 * (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
 */
export const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './pages/home/home.module#HomeModule',
    data: {
      title: 'Sani Zangrando',
      logo: 'assets/logo.png',
      navigationAction: 'menu',
      icon: 'home',
      showAsPopupActionItem: false,
      showAsDrawerItem: false,
      actionBarHidden: false,
      actionItemsHidden: false,
      opacityTopScrollPosition: 150
    }
  },
  {
    path: 'about',
    pathMatch: 'full',
    loadChildren: './pages/about/about.module#AboutModule',
    // component: AboutComponent,
    data: {
      title: 'Chi siamo',
      navigationAction: 'arrow_back',
      logo: 'assets/logo.png',
      backLink: '/',
      icon: 'university',
      showAsPopupActionItem: true,
      showAsDrawerItem: true,
      actionBarHidden: false,
      actionItemsHidden: false,
      opacityTopScrollPosition: 150
    }
  },
  {
    path: 'people',
    pathMatch: 'prefix',
    loadChildren: './pages/people/people.module#PeopleModule',
    data: {
      title: 'Professionisti',
      navigationAction: 'arrow_back',
      logo: 'assets/logo.png',
      backLink: '/',
      icon: 'users',
      showAsPopupActionItem: true,
      showAsDrawerItem: true,
      actionBarHidden: false,
      actionItemsHidden: false,
      opacityTopScrollPosition: 150
    }
  },
  {
    path: 'practice-areas',
    pathMatch: 'prefix',
    loadChildren:
      './pages/practice-area/practice-area.module#PracticeAreaModule',
    data: {
      title: 'Rami d\'attività',
      navigationAction: 'arrow_back',
      logo: 'assets/logo.png',
      backLink: '/',
      icon: 'briefcase',
      showAsPopupActionItem: true,
      showAsDrawerItem: true,
      actionBarHidden: false,
      actionItemsHidden: false,
      opacityTopScrollPosition: 150
    }
  },
  {
    path: 'news',
    pathMatch: 'prefix',
    loadChildren: './pages/news/news.module#NewsModule',
    data: {
      title: 'Eventi e pubblicazioni',
      navigationAction: 'arrow_back',
      logo: 'assets/logo.png',
      backLink: '/',
      icon: 'info',
      showAsPopupActionItem: true,
      showAsDrawerItem: true,
      actionBarHidden: false,
      actionItemsHidden: false,
      opacityTopScrollPosition: 150
    }
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
