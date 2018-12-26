import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';

@Component({
  selector: 'sazalex-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss']
})
export class PeopleDetailComponent implements PageComponent, OnInit {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
