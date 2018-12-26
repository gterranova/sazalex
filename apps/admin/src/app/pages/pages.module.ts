import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesListComponent } from './pages-list/pages-list.component';
import { PagesDetailComponent } from './pages-detail/pages-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@sazalex/ui';
import { MaterialDesignFrameworkModule } from 'angular7-json-schema-form';
import { PagesResolveService, PagesSchemaDetailsResolveService } from './pages-resolve.service';

@NgModule({
  declarations: [PagesListComponent, PagesDetailComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    MaterialDesignFrameworkModule
  ]
})
export class PagesModule { 
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: PagesModule,
      providers: [
        PagesResolveService,
        PagesSchemaDetailsResolveService
      ]
    };
  }
}
