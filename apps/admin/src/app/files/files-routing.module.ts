import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilesComponent } from './files.component';

const routes: Routes = [
  {
    path: '',
    component: FilesComponent,
    data: {
      title: 'Files',
      navigationAction: 'arrow_back',
      backLink: '/'
    }
  },
  {
    path: ':id',
    component: FilesComponent,
    data: {
      title: 'Files',
      navigationAction: 'arrow_back',
      backLink: '/files'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }
