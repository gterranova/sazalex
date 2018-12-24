import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatasourceService } from './datasource.service';
import { SeoService } from './seo.service';

@NgModule({
  imports: [CommonModule]
})
export class DatasourceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DatasourceModule,
      providers: [DatasourceService, SeoService]
    };
  }
}
