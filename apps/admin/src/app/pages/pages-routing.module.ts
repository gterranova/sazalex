import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesListComponent } from './pages-list/pages-list.component';
import { PagesDetailComponent } from './pages-detail/pages-detail.component';
import { PagesResolveService, PagesSchemaDetailsResolveService } from './pages-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: PagesListComponent,
    resolve: { context: PagesResolveService },
    data: {
      title: 'Pages',
      navigationAction: 'arrow_back',
      backLink: '/'
    }
  },
  {
    path: 'new',
    component: PagesDetailComponent,
    resolve: { schema: PagesSchemaDetailsResolveService },
    data: {
      title: 'New pages',
      navigationAction: 'arrow_back',
      backLink: '/pages'
    }
  },
  {
    path: ':id',
    component: PagesDetailComponent,
    resolve: {
      context: PagesResolveService,
      schema: PagesSchemaDetailsResolveService
    },
    data: {
      title: 'Edit pages',
      navigationAction: 'arrow_back',
      backLink: '/pages'
    }
    // canDeactivate: [ CanDeactivateFormGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
