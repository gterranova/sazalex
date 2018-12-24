import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import {
  UsersListResolveService,
  UsersDetailsResolveService,
  UsersSchemaDetailsResolveService
} from './users-resolve.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@sazalex/ui';
import { MaterialDesignFrameworkModule } from 'angular7-json-schema-form';

@NgModule({
  declarations: [UsersListComponent, UsersDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    UsersRoutingModule,
    MaterialDesignFrameworkModule
  ]
})
export class UsersModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: UsersModule,
      providers: [
        UsersListResolveService,
        UsersDetailsResolveService,
        UsersSchemaDetailsResolveService
      ]
    };
  }
}
