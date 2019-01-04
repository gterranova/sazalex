import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '@sazalex/datasource';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'sazalex-users-list',
  template: `<sazalex-item-list [items]="items" [columns]="columnsDef" 
    sortColumn="name" [showFilter]="showFilter"></sazalex-item-list>`,
  styles: [``]
})
export class NewsListComponent implements OnInit {
  columnsDef = [
    { name: 'date', label: 'Date' },
    { name: 'title', label: 'Title' },
    { name: 'slug', label: 'Slug' },
    { name: 'featured', label: 'On Homepage?' },
    { name: 'category', label: 'Category' }];
  items: Observable<News>;
  showFilter = true;
  
  constructor(protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.items = this.route.data.pipe(pluck('list'));
  }

}
