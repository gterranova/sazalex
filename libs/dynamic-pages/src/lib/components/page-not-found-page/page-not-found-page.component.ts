import { Component, OnInit, Input } from '@angular/core';
import { PageComponent } from '../../page.component';

@Component({
  selector: 'sazalex-page-not-found-page',
  templateUrl: './page-not-found-page.component.html',
  styleUrls: ['./page-not-found-page.component.scss']
})
export class PageNotFoundPageComponent implements PageComponent, OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
