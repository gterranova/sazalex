import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';

// app
import { UiModule } from '@sazalex/ui';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [CommonModule, UiModule, AboutRoutingModule],
  declarations: [AboutComponent]
})
export class AboutModule {
  /*
    constructor( @Optional() @SkipSelf() parentModule: AboutModule) {
        if (parentModule) {
            throw new Error('AboutModule already loaded; Import in root module only.');
        }
    }
*/
}
