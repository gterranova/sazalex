import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';

@Component({
  selector: 'sazalex-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent implements PageComponent, OnInit {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
