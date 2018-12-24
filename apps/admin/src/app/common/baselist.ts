import { Input, Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Sort } from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

export abstract class BaseList<T> {
  items: Observable<Array<T>>;
  protected _items: Array<T>;

  // MatPaginator Inputs
  length = 9;
  pageSize = 9;
  pageSizeOptions = [9, 25, 100];

  filterParams: any = {};
  // @Output() onFilterChanged = new EventEmitter<T>();

  subscriptions: Subscription[] = [];

  data: MatTableDataSource<T>;
  sortData: any;
  sortedData: Array<T> = new Array<T>();
  isLoading: boolean = true;
  defaultSort: Sort = <Sort>{ active: '', direction: '' };

  // MatPaginator Output
  protected paginator: MatPaginator;
  protected sort: MatSort;

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
    return (data: T[], sort?: Sort): T[] => {
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

  abstract sortPredicate(sort: Sort, a: T, b: T): number;
  abstract filterPredicate(data: T, filter: string): boolean;
}
