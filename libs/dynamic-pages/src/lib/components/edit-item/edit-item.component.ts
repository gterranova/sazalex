import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let require: any;

@Component({
  selector: 'sazalex-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
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
