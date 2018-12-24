import {
  Component, OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '@sazalex/datasource';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'sazalex-people-list',
  template: `<sazalex-item-list [items]="items" [columns]="columnsDef" 
    sortColumn="position" [showFilter]="showFilter"></sazalex-item-list>`,
  styles: [``]
})
export class PeopleListComponent implements OnInit {
  columnsDef = [
    { name: 'position', label: 'Position' },
    { name: 'name', label: 'Name' },
    { name: 'surname', label: 'Surname' },
    { name: 'role', label: 'Role' }];

  items: Observable<Person>;
  showFilter = true;

  constructor(protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.items = this.route.data.pipe(pluck('list'));
  }

}
