import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { UiModule } from '@sazalex/ui';
import { UploadService } from './services/upload.service';
import { FileManagerComponent } from './file-manager.component';
import { NewFolderDialogComponent } from './components/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './components/rename-dialog/rename-dialog.component';
import { FormsModule } from '@angular/forms';
import { DatasourceModule } from '@sazalex/datasource';

@NgModule({
  imports: [CommonModule, FormsModule, UiModule, DatasourceModule],
  declarations: [UploadDialogComponent, FileManagerComponent, NewFolderDialogComponent, RenameDialogComponent],
  entryComponents: [UploadDialogComponent, NewFolderDialogComponent, RenameDialogComponent],
  providers: [UploadService],
  exports: [FileManagerComponent],
})
export class FileManagerModule { }
