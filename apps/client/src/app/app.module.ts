import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from '@sazalex/ui';
//import { NxModule } from '@nrwl/nx';

import { RouterDirectivesModule } from '@sazalex/router-directives';
import { DatasourceModule } from '@sazalex/datasource';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),    
    BrowserTransferStateModule,
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
