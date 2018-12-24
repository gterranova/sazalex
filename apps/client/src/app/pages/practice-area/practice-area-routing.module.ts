import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeListComponent } from './practice-list/practice-list.component';
import { PracticeDetailComponent } from './practice-detail/practice-detail.component';
import {
  PracticeListResolveService,
  PracticeDetailsResolveService
} from './practice-resolve.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PracticeListComponent,
    resolve: { list: PracticeListResolveService }
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: PracticeDetailComponent,
    resolve: { details: PracticeDetailsResolveService },
    data: {
      title: '{{practice}}',
      navigationAction: 'arrow_back',
      logo: 'assets/logo.png',
      backLink: '/practice-areas',
      icon: 'briefcase',
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
export class PracticeAreaRoutingModule {}
