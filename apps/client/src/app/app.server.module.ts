import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FlexLayoutServerModule,
    NoopAnimationsModule,
    ModuleMapLoaderModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
