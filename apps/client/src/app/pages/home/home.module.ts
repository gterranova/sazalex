import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';
import { UiModule } from '@sazalex/ui';
import { DatasourceModule } from '@sazalex/datasource';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

// app
import { NguCarouselModule } from '@ngu/carousel';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    DatasourceModule,
    NguCarouselModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
  /*
    constructor(@Optional() @SkipSelf() parentModule: HomeModule) {
        if (parentModule) {
            throw new Error('HomeModule already loaded; Import in root module only.');
        }
    }
*/
}
