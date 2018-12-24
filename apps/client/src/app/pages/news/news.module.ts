import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';

// app
import { UiModule } from '@sazalex/ui';
import { DatasourceModule } from '@sazalex/datasource';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import {
  NewsListResolveService,
  NewsDetailsResolveService
} from './news-resolve.service';

@NgModule({
  imports: [CommonModule, UiModule, DatasourceModule, NewsRoutingModule],
  declarations: [NewsListComponent, NewsDetailComponent],
  providers: [NewsListResolveService, NewsDetailsResolveService]
})
export class NewsModule {
  /*
    constructor( @Optional() @SkipSelf() parentModule: NewsModule) {
        if (parentModule) {
            throw new Error('NewsModule already loaded; Import in root module only.');
        }
    }
*/
}
