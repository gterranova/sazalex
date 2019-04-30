import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let require: any;

@Component({
  selector: 'sazalex-edit-item',
  template: `<div *ngIf="!isLoading" class="mat-elevation-z8 details-container">
    <sazalex-item-details [form]="jsonFormObject"></sazalex-item-details>
  </div>`,
  styles: [``]
})
export class EditItemComponent implements OnInit {
  data: any;
  schema: any;
  isLoading = true;
  jsonFormObject: any;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const { context = {}, pageInfo, schema } = this.data;
    this.jsonFormObject = { layout: pageInfo.form, schema, data: context };
    this.isLoading = false;
  }

}
