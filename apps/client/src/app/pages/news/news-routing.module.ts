import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import {
  NewsListResolveService,
  NewsDetailsResolveService
} from './news-resolve.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewsListComponent,
    resolve: { list: NewsListResolveService }
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: NewsDetailComponent,
    resolve: { details: NewsDetailsResolveService },
    data: {
      title: 'News',
      navigationAction: 'arrow_back',
      logo: 'assets/logo.png',
      backLink: '/news',
      icon: 'info',
      showAsPopupActionItem: false,
      showAsDrawerItem: false,
      actionBarHidden: false,
      actionItemsHidden: false,
      opacityTopScrollPosition: 150
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {}
