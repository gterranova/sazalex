import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from '@sazalex/ui';
//import { NxModule } from '@nrwl/nx';

import { RouterDirectivesModule } from '@sazalex/router-directives';
import { DatasourceModule } from '@sazalex/datasource';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    DatasourceModule.forRoot(),
    UiModule.forRoot(),
    RouterDirectivesModule.forRoot(),
    MarkdownModule.forRoot(),
    AppRoutingModule,
    /*
    NxModule.forRoot(),
    */
  ],
  bootstrap: [AppComponent],
  exports: [DatasourceModule]
})
export class AppModule {}
