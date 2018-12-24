import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import {
  PeopleListResolveService,
  PeopleDetailsResolveService,
  PeopleSchemaDetailsResolveService
} from './people-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent,
    resolve: { list: PeopleListResolveService },
    data: {
      title: 'People',
      navigationAction: 'arrow_back',
      backLink: '/'
    }
  },
  {
    path: 'new',
    component: PeopleDetailsComponent,
    resolve: { schema: PeopleSchemaDetailsResolveService },
    data: {
      title: 'New person',
      navigationAction: 'arrow_back',
      backLink: '/people'
    }
  },
  {
    path: ':id',
    component: PeopleDetailsComponent,
    resolve: {
      details: PeopleDetailsResolveService,
      schema: PeopleSchemaDetailsResolveService
    },
    data: {
      title: 'Edit person',
      navigationAction: 'arrow_back',
      backLink: '/people'
    }
    // canDeactivate: [ CanDeactivateFormGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule {}
