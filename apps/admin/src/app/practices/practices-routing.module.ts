import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PracticesListComponent } from './practices-list/practices-list.component';
import { PracticesDetailsComponent } from './practices-details/practices-details.component';
import {
  PracticesListResolveService,
  PracticesDetailsResolveService,
  PracticesSchemaDetailsResolveService
} from './practices-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: PracticesListComponent,
    resolve: { list: PracticesListResolveService },
    data: {
      title: 'Practices',
      navigationAction: 'arrow_back',
      backLink: '/'
    }
  },
  {
    path: 'new',
    component: PracticesDetailsComponent,
    resolve: { schema: PracticesSchemaDetailsResolveService },
    data: {
      title: 'New news',
      navigationAction: 'arrow_back',
      backLink: '/news'
    }
  },
  {
    path: ':id',
    component: PracticesDetailsComponent,
    resolve: {
      details: PracticesDetailsResolveService,
      schema: PracticesSchemaDetailsResolveService
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
export class PracticesRoutingModule {}
