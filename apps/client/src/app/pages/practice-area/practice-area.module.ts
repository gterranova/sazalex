import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA } from '@angular/core';

// app
import { UiModule } from '@sazalex/ui';
import { DatasourceModule } from '@sazalex/datasource';
import { CommonModule } from '@angular/common';
import { PracticeAreaRoutingModule } from './practice-area-routing.module';
import { PracticeListComponent } from './practice-list/practice-list.component';
import { PracticeDetailComponent } from './practice-detail/practice-detail.component';
import { PracticeListMenuComponent } from './practice-list-menu/practice-list-menu.component';
import { MarkdownModule } from 'ngx-markdown';
import {
  PracticeListResolveService,
  PracticeDetailsResolveService
} from './practice-resolve.service';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    DatasourceModule,
    MarkdownModule.forChild(),
    PracticeAreaRoutingModule
  ],
  declarations: [
    PracticeListComponent,
    PracticeDetailComponent,
    PracticeListMenuComponent
  ],
  providers: [PracticeListResolveService, PracticeDetailsResolveService]
})
export class PracticeAreaModule {
  /*
    constructor( @Optional() @SkipSelf() parentModule: PracticeAreaModule) {
        if (parentModule) {
            throw new Error('PracticeAreaModule already loaded; Import in root module only.');
        }
    }
*/
}
