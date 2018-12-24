import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Practice } from '@sazalex/datasource';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'sazalex-practice-detail',
  templateUrl: './practice-detail.component.html',
  styleUrls: ['./practice-detail.component.scss']
})
export class PracticeDetailComponent implements OnInit {
  id: string;
  details: Observable<Practice>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.details = this.route.data.pipe(pluck('details'));
  }
}
