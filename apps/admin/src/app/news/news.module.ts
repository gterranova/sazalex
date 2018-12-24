import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import {
  NewsListResolveService,
  NewsDetailsResolveService,
  NewsSchemaDetailsResolveService
} from './news-resolve.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@sazalex/ui';
import { MaterialDesignFrameworkModule } from 'angular7-json-schema-form';

@NgModule({
  declarations: [NewsListComponent, NewsDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    NewsRoutingModule,
    MaterialDesignFrameworkModule
  ]
})
export class NewsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NewsModule,
      providers: [
        NewsListResolveService,
        NewsDetailsResolveService,
        NewsSchemaDetailsResolveService
      ]
    };
  }
}
