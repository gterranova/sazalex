import { AbstractControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { JsonSchemaFormService } from 'angular7-json-schema-form';

@Component({
  selector: 'sazalex-md-editor-widget',
  templateUrl: './md-editor-widget.component.html',
  styleUrls: ['./md-editor-widget.component.css']
})
export class MdEditorWidgetComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled = false;
  boundControl = false;
  options: any;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);
    if (!this.options.notitle && !this.options.description && this.options.placeholder) {
      this.options.description = this.options.placeholder;
    }
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
