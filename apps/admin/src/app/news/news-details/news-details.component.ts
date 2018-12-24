import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let require: any;
const formLayout = require('./form-layout.json');

@Component({
  selector: 'sazalex-people-details',
  template: `<div *ngIf="!isLoading" class="mat-elevation-z8 details-container">
    <sazalex-item-details [form]="jsonFormObject"></sazalex-item-details>
  </div>`,
  styles: [``]
})
export class NewsDetailsComponent implements OnInit {
  isLoading = true;
  jsonFormObject: any;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      const { details = {}, schema } = data;
      this.jsonFormObject = { layout: formLayout, schema, data: details };
      this.isLoading = false;
    });
  }

}
