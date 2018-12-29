import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerModule } from '@sazalex/file-manager';

import { FilesRoutingModule } from './files-routing.module';
import { FilesComponent } from './files.component';
import { UiModule } from '@sazalex/ui';

@NgModule({
  declarations: [FilesComponent],
  imports: [
    CommonModule,
    FilesRoutingModule,
    UiModule, FileManagerModule
  ]
})
export class FilesModule { }
