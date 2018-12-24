import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import {
  PeopleListResolveService,
  PeopleDetailsResolveService,
  PeopleSchemaDetailsResolveService
} from './people-resolve.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@sazalex/ui';
import { MaterialDesignFrameworkModule } from 'angular7-json-schema-form';

@NgModule({
  declarations: [PeopleListComponent, PeopleDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    PeopleRoutingModule,
    MaterialDesignFrameworkModule
  ]
})
export class PeopleModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: PeopleModule,
      providers: [
        PeopleListResolveService,
        PeopleDetailsResolveService,
        PeopleSchemaDetailsResolveService
      ]
    };
  }
}
