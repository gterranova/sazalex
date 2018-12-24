import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import {
  NewsListResolveService,
  NewsDetailsResolveService,
  NewsSchemaDetailsResolveService
} from './news-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
    resolve: { list: NewsListResolveService },
    data: {
      title: 'News',
      navigationAction: 'arrow_back',
      backLink: '/'
    }
  },
  {
    path: 'new',
    component: NewsDetailsComponent,
    resolve: { schema: NewsSchemaDetailsResolveService },
    data: {
      title: 'New news',
      navigationAction: 'arrow_back',
      backLink: '/news'
    }
  },
  {
    path: ':id',
    component: NewsDetailsComponent,
    resolve: {
      details: NewsDetailsResolveService,
      schema: NewsSchemaDetailsResolveService
    },
    data: {
      title: 'Edit news',
      navigationAction: 'arrow_back',
      backLink: '/news'
    }
    // canDeactivate: [ CanDeactivateFormGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {}
