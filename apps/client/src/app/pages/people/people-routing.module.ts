import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleDetailComponent } from './people-detail/people-detail.component';
import {
  PeopleListResolveService,
  PeopleDetailsResolveService
} from './people-resolve.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PeopleListComponent,
    resolve: { list: PeopleListResolveService }
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: PeopleDetailComponent,
    resolve: { details: PeopleDetailsResolveService },
    data: {
      title: '{{name}}',
      navigationAction: 'arrow_back',
      logo: 'assets/logo.png',
      backLink: '/people',
      icon: 'users',
      showAsPopupActionItem: false,
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
export class PeopleRoutingModule {}
