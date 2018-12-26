import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';

@Component({
  selector: 'sazalex-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements PageComponent, OnInit {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
