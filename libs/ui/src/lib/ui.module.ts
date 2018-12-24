import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { HeroProfileBannerComponent } from './components/hero-banner/hero-profile-banner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SafePipe } from './pipes/safe.pipe';
import { ItemListComponent } from './components/item-list/item-list.component';
import { FormsModule } from '@angular/forms';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { MaterialDesignFrameworkModule } from 'angular7-json-schema-form';
import { MarkdownEditorModule } from '@sazalex/markdown-editor';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, MaterialModule,
    MaterialDesignFrameworkModule,
    MarkdownEditorModule
  ],
  declarations: [
    FooterComponent,
    HeroBannerComponent,
    HeroProfileBannerComponent,
    PageNotFoundComponent,
    ItemListComponent,
    SafePipe,
    ItemDetailsComponent
  ],
  exports: [
    MaterialModule,
    FooterComponent,
    HeroBannerComponent,
    HeroProfileBannerComponent,
    PageNotFoundComponent,
    ItemListComponent,
    ItemDetailsComponent,
    SafePipe
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
