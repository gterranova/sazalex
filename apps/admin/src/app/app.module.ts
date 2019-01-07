import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiModule } from '@sazalex/ui';
import { RouterDirectivesModule } from '@sazalex/router-directives';
import { DatasourceModule } from '@sazalex/datasource';
import { AuthModule } from '@sazalex/auth';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MaterialDesignFrameworkModule } from 'angular7-json-schema-form';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { MarkdownModule } from 'ngx-markdown';
import { MarkdownEditorModule } from '@sazalex/markdown-editor';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    UiModule.forRoot(),
    AuthModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),    
    NxModule.forRoot(),
    DatasourceModule.forRoot(),
    RouterDirectivesModule.forRoot(),
    MaterialDesignFrameworkModule,
    MarkdownModule.forRoot(),
    MarkdownEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
