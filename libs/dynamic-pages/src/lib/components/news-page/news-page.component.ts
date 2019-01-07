import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sazalex-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements PageComponent, OnInit {
  data: any;

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

}
