import { Component, OnInit, Input, ViewChild, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatasourceService } from '@sazalex/datasource';
import { Observable, Subscription } from 'rxjs';
import { Sort, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EventEmitter } from 'events';

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

interface ItemWithId {
  _id: string;
};

@Component({
  selector: 'sazalex-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent<T extends ItemWithId> implements OnInit, OnDestroy {
  collectionUrl: string;
  @Input() items: Observable<any>;
  @Input() columns: any[];
  @Input() displayedColumns?: any[];
  @Input() sortColumn?: string;
  @Input() showFilter = true;

  @Output() onSelect = new EventEmitter();
  @Output() onHover = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  protected _items: T[];
  // MatPaginator Inputs
  length = 9;
  pageSize = 9;
  pageSizeOptions = [9, 25, 100];

  filterParams: any = { fullText: ''};

  subscriptions: Subscription[] = [];

  data: MatTableDataSource<T>;
  sortData: any;
  sortedData: T[] = [];
  isLoading: boolean = true;
  defaultSort: Sort;

  // MatPaginator Output
  protected paginator: MatPaginator;
  protected sort: MatSort;
  
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected datasourceService: DatasourceService
  ) {
  }

  ngOnInit() {
    this.collectionUrl = this.router.url;
    if (!this.displayedColumns) {
      this.displayedColumns = [...this.columns.map(c => c.name), 'actions'];
    }
    this.defaultSort = <Sort>{ active: this.sortColumn||'', direction: 'asc' };
  }

  @ViewChild(MatSort)
  set matSort(ms: MatSort) {
    this.sort = ms;
    if (!this.isLoading) this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (!this.isLoading) this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    let sub1 = this.items.subscribe(items => {
      this._items = items;
      if (this.isLoading) {
        this.data = new MatTableDataSource<T>(items);
        this.data.filterPredicate = this.filterPredicate;
        this.data.sortData = this.sortData = this.sortDataFactory();
      }
      this.data.data = this.sortData(items);
      //if (this.filterParams)
      //  this.applyFilter();
      setTimeout(() => (this.isLoading = false), 0);
    });
    this.subscriptions.push(sub1);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  applyFilter() {
    // this.onFilterChanged.next(this.filterParams);
    this.data.filter = JSON.stringify(this.filterParams);
  }

  sortDataFactory() {
    let self = this;
    return (data: any[], sort?: Sort): any[] => {
      sort = sort || self.defaultSort;
      const items = Array.from(data);
      if (!sort.active || sort.direction == '') {
        return data;
      }
      let ret = items.sort((a, b) => self.sortPredicate(sort, a, b));
      return ret;
    };
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  sortPredicate(sort: Sort, a: T, b: T): number {
    let isAsc = sort.direction === 'asc';
    //if (sort.active == 'num')
    //  return compare(+a[sort.active], +b[sort.active], isAsc);
    return compare(a[sort.active], b[sort.active], isAsc);
  }

  filterPredicate(data: T, filter: string): boolean {
    const params = JSON.parse(filter);
    if (params.fullText)
      return (
        JSON.stringify(data)
          .toLowerCase()
          .indexOf(params.fullText.trim().toLowerCase()) !== -1
      );
    return true;
  }

  onSelectRow(data: T) {
    this.router.navigate([this.collectionUrl, data._id]);
  }

  onHoverRow(data: T) {
  }

  async onDeleteClicked(data: any, event) {
    if (event) event.stopPropagation();
    await this.datasourceService.request('delete', `${this.collectionUrl}/${data._id}`)
      .toPromise();
    this.data.data = this.data.data.filter(u => u._id !== data._id);
  }
}
