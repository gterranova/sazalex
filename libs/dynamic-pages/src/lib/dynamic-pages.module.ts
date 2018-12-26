import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageDirective } from './page.directive';
import { DynamicPageComponent } from './dynamic-page.component';
import { FormsModule } from '@angular/forms';
import { DefaultPageComponent } from './components/default-page/default-page.component';
import { UiModule } from '@sazalex/ui';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { RouterModule } from '@angular/router';
import { PeoplePageComponent } from './components/people-page/people-page.component';
import { PeopleDetailComponent } from './components/people-detail/people-detail.component';
import { PracticesPageComponent } from './components/practices-page/practices-page.component';
import { PracticesDetailComponent } from './components/practices-detail/practices-detail.component';
import { MarkdownModule } from 'ngx-markdown';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DatasourceModule } from '@sazalex/datasource';
import { NguCarouselModule } from '@ngu/carousel';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, UiModule, NguCarouselModule, DatasourceModule, MarkdownModule.forChild()],
  declarations: [PageDirective, DynamicPageComponent, DefaultPageComponent, AboutPageComponent, NewsPageComponent, NewsDetailComponent, PeoplePageComponent, PeopleDetailComponent, PracticesPageComponent, PracticesDetailComponent, HomePageComponent],
  entryComponents: [DefaultPageComponent, HomePageComponent, AboutPageComponent, NewsPageComponent, NewsDetailComponent, PeoplePageComponent, PeopleDetailComponent, PracticesPageComponent, PracticesDetailComponent],
  exports: [DynamicPageComponent]
})
export class DynamicPagesModule {}
