import { Component, OnInit, Input } from '@angular/core';
import { PageComponent } from '../../page.component';

@Component({
  selector: 'sazalex-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.scss']
})
export class DefaultPageComponent implements PageComponent, OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
