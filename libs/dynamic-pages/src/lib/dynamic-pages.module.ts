import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageDirective } from './page.directive';
import { DynamicPageComponent } from './dynamic-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@sazalex/ui';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { DatasourceModule } from '@sazalex/datasource';
import { NguCarouselModule } from '@ngu/carousel';
import { NgxMasonryModule } from 'ngx-masonry';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { DYNAMIC_COMPONENTS } from './components';
import { MarkdownEditorModule } from '@sazalex/markdown-editor';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    RouterModule, 
    UiModule, 
    NguCarouselModule, 
    DatasourceModule, 
    MarkdownModule.forChild(),
    NgxMasonryModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    TranslateModule,
    NgxJsonLdModule,
    MarkdownEditorModule,
  ],
  declarations: [
    PageDirective, 
    DynamicPageComponent, 
    ...DYNAMIC_COMPONENTS
  ],
  entryComponents: [
    ...DYNAMIC_COMPONENTS
  ],
  exports: [
    DynamicPageComponent
  ]
})
export class DynamicPagesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DynamicPagesModule,
      providers: []
    };
  }  
}
