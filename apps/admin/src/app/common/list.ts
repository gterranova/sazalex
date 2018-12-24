import {
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { BaseList } from './baselist';
import { Sort } from '@angular/material';
import { DatasourceService } from '@sazalex/datasource';

function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export abstract class List<T> extends BaseList<T> implements OnInit {
    collectionUrl: string;

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected datasourceService: DatasourceService
    ) {
        super();
        this.collectionUrl = this.router.url;
    }

    ngOnInit() {
        this.items = this.route.data.pipe(pluck('list'));
    }

    sortPredicate(sort: Sort, a: any, b: any): number {
        let isAsc = sort.direction === 'asc';
        //if (sort.active == 'num')
        //  return compare(+a[sort.active], +b[sort.active], isAsc);
        return compare(a[sort.active], b[sort.active], isAsc);
    }

    filterPredicate(data: any, filter: string): boolean {
        const params = JSON.parse(filter);
        if (params.fullText)
            return (
                JSON.stringify(data)
                    .toLowerCase()
                    .indexOf(params.fullText.trim().toLowerCase()) !== -1
            );
        return true;
    }

    onSelectRow(data: any) {
        this.router.navigate([this.collectionUrl, data._id]);
    }

    onHoverRow(data: any) {
    }

    async onDeleteClicked(data: any, event) {
        if (event) event.stopPropagation();
        await this.datasourceService.request('delete', `${this.collectionUrl}/${data._id}`)
            .toPromise();
        this.data.data = this.data.data.filter(u => u['_id'] !== data._id);
    }
}
