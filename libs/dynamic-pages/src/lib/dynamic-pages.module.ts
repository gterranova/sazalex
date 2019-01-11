import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageDirective } from './page.directive';
import { DynamicPageComponent } from './dynamic-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultPageComponent } from './components/default-page/default-page.component';
import { UiModule } from '@sazalex/ui';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { RouterModule } from '@angular/router';
import { PeoplePageComponent } from './components/people-page/people-page.component';
import { PeopleDetailComponent } from './components/people-detail/people-detail.component';
import { PracticesDetailComponent } from './components/practices-detail/practices-detail.component';
import { MarkdownModule } from 'ngx-markdown';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DatasourceModule } from '@sazalex/datasource';
import { NguCarouselModule } from '@ngu/carousel';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { PageNotFoundPageComponent } from './components/page-not-found-page/page-not-found-page.component';

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
    NgxJsonLdModule
  ],
  declarations: [
    PageDirective, 
    DynamicPageComponent, 
    DefaultPageComponent, 
    NewsPageComponent, 
    NewsDetailComponent, 
    PeoplePageComponent, 
    PeopleDetailComponent, 
    PracticesDetailComponent, 
    HomePageComponent, 
    ContactsPageComponent,
    PageNotFoundPageComponent
  ],
  entryComponents: [
    DefaultPageComponent, 
    HomePageComponent, 
    NewsPageComponent, 
    NewsDetailComponent, 
    PeoplePageComponent, 
    PeopleDetailComponent, 
    PracticesDetailComponent, 
    ContactsPageComponent,
    PageNotFoundPageComponent,
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
