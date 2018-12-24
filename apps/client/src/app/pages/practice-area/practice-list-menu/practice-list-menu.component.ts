import { Component, Input, OnInit } from '@angular/core';
import { DatasourceService, Practice } from '@sazalex/datasource';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'sazalex-practice-list-menu',
  templateUrl: './practice-list-menu.component.html',
  styleUrls: ['./practice-list-menu.component.scss']
})
export class PracticeListMenuComponent implements OnInit {
  @Input()
  title = 'PRACTICE AREAS';
  @Input()
  ids?: any[] = [];
  public practices: Observable<Practice[]>;

  constructor(private datasource: DatasourceService) {
    this.practices = datasource.getAllPractices().pipe(
      map(practices => {
        if (this.ids.length) {
          return practices.filter(p => ~this.ids.indexOf(p._id));
        }
        return practices;
      })
    );
  }

  ngOnInit() {}
}
