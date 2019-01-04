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

const PageTypes = {
  'default-page': DefaultPageComponent,
  'home-page': HomePageComponent,
  'news-page': NewsPageComponent,
  'news-detail': NewsDetailComponent,
  'people-page': PeoplePageComponent,
  'people-detail': PeopleDetailComponent,
  'practices-detail': PracticesDetailComponent,
  'contacts-page': ContactsPageComponent,
};

@Component({
  selector: 'sazalex-dynamic-page',
  template: `<div class="dynamic-page"><ng-template page-host></ng-template></div>`
})
export class DynamicPageComponent implements OnInit {
  @Input() type: string = 'default-page';
  @ViewChild(PageDirective) pageHost: PageDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private dataSourceService: DatasourceService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
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

}
