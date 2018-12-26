import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';

@Component({
  selector: 'sazalex-practices-page',
  templateUrl: './practices-page.component.html',
  styleUrls: ['./practices-page.component.scss']
})
export class PracticesPageComponent implements PageComponent, OnInit {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
