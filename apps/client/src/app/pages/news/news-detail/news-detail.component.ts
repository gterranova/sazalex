import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from '@sazalex/datasource';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  moduleId: module.id,
  selector: 'sazalex-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  id: string;
  details: Observable<News>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.details = this.route.data.pipe(pluck('details'));
  }
}
