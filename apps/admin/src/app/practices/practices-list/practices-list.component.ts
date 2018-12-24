import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Practice } from '@sazalex/datasource';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'sazalex-users-list',
  template: `<sazalex-item-list [items]="items" [columns]="columnsDef" 
    sortColumn="name" [showFilter]="showFilter"></sazalex-item-list>`,
  styles: [``]
})
export class PracticesListComponent implements OnInit {
  columnsDef = [{ name: 'name', label: 'Name' }];
  items: Observable<Practice>;
  showFilter = true;
  
  constructor(protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.items = this.route.data.pipe(pluck('list'));
  }

}
