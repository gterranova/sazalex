import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input, Inject, PLATFORM_ID, ComponentRef } from '@angular/core';
import { PageDirective } from './page.directive';
import { PageComponent } from './page.component';
import { ActivatedRoute } from '@angular/router';
import { DatasourceService, Page } from '@sazalex/datasource';
import { of } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PageTypes } from './components';

declare const window: any;


@Component({
  selector: 'sazalex-dynamic-page',
  template: `<div class="dynamic-page"><ng-template page-host></ng-template></div>`
})
export class DynamicPageComponent implements OnInit {
  @Input() type: string = 'default-page';
  @ViewChild(PageDirective) pageHost: PageDirective;

  titleSep = ' | ';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private dataSourceService: DatasourceService,
    private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.route.data.subscribe((data: PageComponent) => {
      this.generateTags(data);
      const dataInfoSource = data.pageInfo ? of(data.pageInfo): this.dataSourceService.getPages(data.name||'default-page');
      dataInfoSource.subscribe( pageInfo => {
        const componentRef = this.setupComponent(pageInfo);
        (<PageComponent>componentRef.instance).data = data;
      });
    }) 
  }

  setupComponent(pageInfo: Page): ComponentRef<any> {
    const componentType = PageTypes[pageInfo.type || 'default-page'] || PageTypes['default-page'];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const viewContainerRef = this.pageHost.viewContainerRef;
    viewContainerRef.clear();
    return viewContainerRef.createComponent(componentFactory);
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

    if (config.pageInfo.title) {
      let newTitle = `${config.pageInfo.title}${this.titleSep}${title}`;
      this.title.setTitle(newTitle);
      this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
      this.meta.updateTag({ name: 'twitter:title', content: newTitle });
      this.meta.updateTag({ property: 'og:type', content: 'article' });
      this.meta.updateTag({ property: 'og:title', content: newTitle });
      this.meta.updateTag({
        property: 'og:url',
        content: `https://www.sazalex.com${this.route.snapshot['_routerState'].url}`
      });
      if (isPlatformBrowser(this.platformId)) {
        (<any>window).gtag('config', 'UA-29448026-2', {
          'page_title' : newTitle,
          'page_path': this.route.snapshot['_routerState'].url
        });      
      }  
    }
    if (config.pageInfo.metaDescription) {
      this.meta.updateTag({ name: 'description', content: config.pageInfo.metaDescription });
      this.meta.updateTag({
        name: 'twitter:description',
        content: config.pageInfo.metaDescription
      });
      this.meta.updateTag({
        property: 'og:description',
        content: config.pageInfo.metaDescription
      });
    }
    if (config.pageInfo.metaKeywords) {
      this.meta.updateTag({ name: 'keywords', content: config.pageInfo.metaKeywords });
    }
  }  

}
