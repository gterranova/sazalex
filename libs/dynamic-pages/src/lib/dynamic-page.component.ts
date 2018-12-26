import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { PageDirective } from './page.directive';
import { DefaultPageComponent } from './components/default-page/default-page.component';
import { PageComponent } from './page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ActivatedRoute } from '@angular/router';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { PeoplePageComponent } from './components/people-page/people-page.component';
import { PeopleDetailComponent } from './components/people-detail/people-detail.component';
import { PracticesPageComponent } from './components/practices-page/practices-page.component';
import { PracticesDetailComponent } from './components/practices-detail/practices-detail.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const PageTypes = {
  'default-page': DefaultPageComponent,
  'home-page': HomePageComponent,
  'about-page': AboutPageComponent,
  'news-page': NewsPageComponent,
  'news-detail': NewsDetailComponent,
  'people-page': PeoplePageComponent,
  'people-detail': PeopleDetailComponent,
  'practices-page': PracticesPageComponent,
  'practices-detail': PracticesDetailComponent
};

@Component({
  selector: 'sazalex-dynamic-page',
  template: `<div class="dynamic-page"><ng-template page-host></ng-template></div>`
})
export class DynamicPageComponent implements OnInit {
  @Input() type: string = 'default-page';
  @ViewChild(PageDirective) pageHost: PageDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const pageInfo = data['page-info'];
      const componentType = PageTypes[pageInfo.type || 'default-page'] || PageTypes['default-page'];
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      const viewContainerRef = this.pageHost.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<PageComponent>componentRef.instance).data = data;  
    }) 
  }

}
