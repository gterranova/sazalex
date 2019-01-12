import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { PageDirective } from './page.directive';
import { DefaultPageComponent } from './components/default-page/default-page.component';
import { PageComponent } from './page.component';
import { ActivatedRoute } from '@angular/router';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { PeoplePageComponent } from './components/people-page/people-page.component';
import { PeopleDetailComponent } from './components/people-detail/people-detail.component';
import { PracticesDetailComponent } from './components/practices-detail/practices-detail.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { DatasourceService } from '@sazalex/datasource';
import { of } from 'rxjs';
import { PageNotFoundPageComponent } from './components/page-not-found-page/page-not-found-page.component';
import { Title, Meta } from '@angular/platform-browser';

const PageTypes = {
  'default-page': DefaultPageComponent,
  'home-page': HomePageComponent,
  'news-page': NewsPageComponent,
  'news-detail': NewsDetailComponent,
  'people-page': PeoplePageComponent,
  'people-detail': PeopleDetailComponent,
  'practices-detail': PracticesDetailComponent,
  'contacts-page': ContactsPageComponent,
  'page-not-found-page': PageNotFoundPageComponent,
};

@Component({
  selector: 'sazalex-dynamic-page',
  template: `<div class="dynamic-page"><ng-template page-host></ng-template></div>`
})
export class DynamicPageComponent implements OnInit {
  @Input() type: string = 'default-page';
  @ViewChild(PageDirective) pageHost: PageDirective;

  titleSep = ' | ';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private dataSourceService: DatasourceService,
    private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.generateTags(data);
      const dataInfoSource = data['page-info'] ? of(data['page-info']): this.dataSourceService.getPages(data.type||'default-page');
      dataInfoSource.subscribe( pageInfo => {
        const componentType = PageTypes[pageInfo.type || 'default-page'] || PageTypes['default-page'];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const viewContainerRef = this.pageHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<PageComponent>componentRef.instance).data = data;
      });
    }) 
  }

  generateTags(config) {
    const title = this.title.getTitle().split(this.titleSep).pop();
    this.meta.updateTag({ name: 'twitter:site', content: '@SaniZangrando' });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Sani Zangrando'
    });
    // default values
    this.meta.updateTag({ name: 'twitter:image', content: 'https://www.sazalex.com/assets/sz-header-a1-home.jpg' });
    this.meta.updateTag({ property: 'og:image', content: 'https://www.sazalex.com/assets/sz-header-a1-home.jpg' });

    if (config['page-info'].title) {
      let newTitle = `${config['page-info'].title}${this.titleSep}${title}`;
      this.title.setTitle(newTitle);
      this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
      this.meta.updateTag({ name: 'twitter:title', content: newTitle });
      this.meta.updateTag({ property: 'og:type', content: 'article' });
      this.meta.updateTag({ property: 'og:title', content: newTitle });
      this.meta.updateTag({
        property: 'og:url',
        content: `https://www.sazalex.com${this.route.snapshot['_routerState'].url}`
      });
      }
    if (config['page-info'].metaDescription) {
      this.meta.updateTag({ name: 'description', content: config['page-info'].metaDescription });
      this.meta.updateTag({
        name: 'twitter:description',
        content: config['page-info'].metaDescription
      });
      this.meta.updateTag({
        property: 'og:description',
        content: config['page-info'].metaDescription
      });
    }
    if (config['page-info'].metaKeywords) {
      this.meta.updateTag({ name: 'keywords', content: config['page-info'].metaKeywords });
    }
  }  

}
