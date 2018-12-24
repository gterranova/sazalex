import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import {
  UsersListResolveService,
  UsersDetailsResolveService,
  UsersSchemaDetailsResolveService
} from './users-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    resolve: { list: UsersListResolveService },
    data: {
      title: 'Users',
      navigationAction: 'arrow_back',
      backLink: '/'
    }
  },
  {
    path: 'new',
    component: UsersDetailsComponent,
    resolve: { schema: UsersSchemaDetailsResolveService },
    data: {
      title: 'New user',
      navigationAction: 'arrow_back',
      backLink: '/users'
    }
  },
  {
    path: ':id',
    component: UsersDetailsComponent,
    resolve: {
      details: UsersDetailsResolveService,
      schema: UsersSchemaDetailsResolveService
    },
    data: {
      title: 'Edit user',
      navigationAction: 'arrow_back',
      backLink: '/users'
    }
    // canDeactivate: [ CanDeactivateFormGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
