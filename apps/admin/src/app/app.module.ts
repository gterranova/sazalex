import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiModule } from '@sazalex/ui';
import { RouterDirectivesModule } from '@sazalex/router-directives';
import { DatasourceModule } from '@sazalex/datasource';
import { AuthModule } from '@sazalex/auth';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialDesignFrameworkModule } from 'angular7-json-schema-form';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { MarkdownEditorModule } from '@sazalex/markdown-editor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    UiModule.forRoot(),
    AuthModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NxModule.forRoot(),
    DatasourceModule.forRoot(),
    RouterDirectivesModule.forRoot(),
    MaterialDesignFrameworkModule,
    MarkdownEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
