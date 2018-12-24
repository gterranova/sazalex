import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';
import { UiModule } from '@sazalex/ui';
import { DatasourceModule } from '@sazalex/datasource';
import { CommonModule } from '@angular/common';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleDetailComponent } from './people-detail/people-detail.component';
import { MarkdownModule } from 'ngx-markdown';
import {
  PeopleListResolveService,
  PeopleDetailsResolveService
} from './people-resolve.service';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    DatasourceModule,
    MarkdownModule.forChild(),
    PeopleRoutingModule
  ],
  declarations: [PeopleListComponent, PeopleDetailComponent],
  providers: [PeopleListResolveService, PeopleDetailsResolveService]
})
export class PeopleModule {
  /*
    constructor( @Optional() @SkipSelf() parentModule: PeopleModule) {
        if (parentModule) {
            throw new Error('PeopleModule already loaded; Import in root module only.');
        }
    }
*/
}
