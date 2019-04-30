import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sazalex-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements PageComponent, OnInit {
  data: any;
  showFilter = true;

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
    if (this.data && this.data.context) {
      const field = 'position';
      this.data.context = this.data.context.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

}
