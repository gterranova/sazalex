import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatasourceService } from '@sazalex/datasource';
import { forkJoin } from 'rxjs';
import { pluck, mergeMap } from 'rxjs/operators';

@Component({
  moduleId: module.id,
  selector: 'sazalex-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss']
})
export class PeopleDetailComponent implements OnInit {
  id: string;
  details: any;
  practiceAreas: any;

  constructor(
    private route: ActivatedRoute,
    private datasource: DatasourceService
  ) {}

  ngOnInit() {
    this.details = this.route.data.pipe(pluck('details'));
    this.practiceAreas = this.details.pipe(
      pluck('practices'),
      mergeMap((ids: string[]) =>
        forkJoin(ids.map(this.datasource.getPractices))
      )
    );
  }
}
