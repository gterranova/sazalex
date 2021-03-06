import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sazalex-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent implements PageComponent, OnInit {
  data: any;

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
