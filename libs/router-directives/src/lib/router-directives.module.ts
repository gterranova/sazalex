import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { UiModule } from '@sazalex/ui';

// app
import { RouterToolbarComponent } from './router-toolbar/router-toolbar.component';
import { RouterDrawerContentComponent } from './router-drawer-content/router-drawer-content.component';
import { RouterModule } from '@angular/router';
import { RouteChangeService } from './route-change.service';
import { DatasourceModule } from '@sazalex/datasource';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    ScrollDispatchModule,
    RouterModule,
    DatasourceModule,
    TranslateModule
  ],
  declarations: [RouterToolbarComponent, RouterDrawerContentComponent],
  exports: [
    ScrollDispatchModule,
    RouterToolbarComponent,
    RouterDrawerContentComponent
  ]
})
export class RouterDirectivesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RouterDirectivesModule,
      providers: [RouteChangeService]
    };
  }
}
