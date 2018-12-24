import { Component, OnInit } from '@angular/core';
import { News } from '@sazalex/datasource';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'sazalex-news',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  public news: Observable<News[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.news = this.route.data.pipe(pluck('list'));
  }
}
