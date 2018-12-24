import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticesRoutingModule } from './practices-routing.module';
import { PracticesListComponent } from './practices-list/practices-list.component';
import { PracticesDetailsComponent } from './practices-details/practices-details.component';
import {
  PracticesListResolveService,
  PracticesDetailsResolveService,
  PracticesSchemaDetailsResolveService
} from './practices-resolve.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@sazalex/ui';
import { MaterialDesignFrameworkModule } from 'angular7-json-schema-form';

@NgModule({
  declarations: [PracticesListComponent, PracticesDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    PracticesRoutingModule,
    MaterialDesignFrameworkModule
  ]
})
export class PracticesModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: PracticesModule,
      providers: [
        PracticesListResolveService,
        PracticesDetailsResolveService,
        PracticesSchemaDetailsResolveService
      ]
    };
  }
}
