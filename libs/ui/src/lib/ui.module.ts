import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { DatasourceModule } from '@sazalex/datasource';
import { SafePipe } from './pipes/safe.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { MarkdownEditorModule } from '@sazalex/markdown-editor';
import { MaterialDesignFrameworkModule } from 'angular7-json-schema-form';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  imports: [CommonModule, 
    FormsModule, RouterModule, MaterialModule,
    MaterialDesignFrameworkModule,
    MarkdownEditorModule,
    DatasourceModule,
  ],
  declarations: [
    SafePipe,
    FooterComponent,
    HeroBannerComponent,
    ItemListComponent,
    ItemDetailsComponent,
    PageNotFoundComponent,
  ],
  exports: [
    MaterialModule,
    SafePipe,
    FooterComponent,
    HeroBannerComponent,
    ItemListComponent,
    ItemDetailsComponent,
    PageNotFoundComponent,
  ]
})
export class UiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UiModule,
      providers: []
    };
  }
}
