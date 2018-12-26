import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'sazalex-pages-list',
  template: `<sazalex-item-list [items]="context" [columns]="columnsDef" 
    sortColumn="name" [showFilter]="showFilter"></sazalex-item-list>`,
  styles: [``]
})
export class PagesListComponent implements OnInit {
  columnsDef = [
    { name: 'title', label: 'Title' },
    { name: 'slug', label: 'Slug' },
    { name: 'type', label: 'Type' }];
  context: Observable<any[]>;
  showFilter = true;
  
  constructor(protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.context = this.route.data.pipe(pluck('context'));
  }

}
