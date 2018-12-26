import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';

import { MarkdownModule } from 'ngx-markdown';
import { UiModule } from '@sazalex/ui';
import { RouterDirectivesModule } from '@sazalex/router-directives';
import { DatasourceModule } from '@sazalex/datasource';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DynamicPagesModule } from '@sazalex/dynamic-pages';
import { DynamicPageComponent } from 'libs/dynamic-pages/src/lib/dynamic-page.component';
import { PathResolveService, TypeResolveService, PageResolveService } from './app.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NxModule.forRoot(),
    MarkdownModule.forRoot(),
    UiModule.forRoot(),
    DatasourceModule.forRoot(),
    RouterDirectivesModule.forRoot(),
    DynamicPagesModule
  ],
  providers: [TypeResolveService, PageResolveService, PathResolveService],
  entryComponents: [DynamicPageComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
