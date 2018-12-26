import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';

@Component({
  selector: 'sazalex-practices-detail',
  templateUrl: './practices-detail.component.html',
  styleUrls: ['./practices-detail.component.scss']
})
export class PracticesDetailComponent implements PageComponent, OnInit {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
