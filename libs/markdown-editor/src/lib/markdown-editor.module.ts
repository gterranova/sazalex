import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatFormField,
  MatHint,
  MatError,
  MatFormFieldModule,
} from '@angular/material';
import { MdEditorComponent } from './md-editor/md-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdEditorWidgetComponent } from './md-editor-widget/md-editor-widget.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  declarations: [MdEditorComponent, MdEditorWidgetComponent],
  entryComponents: [MdEditorWidgetComponent]
})
export class MarkdownEditorModule {}
