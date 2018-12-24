import { Component, OnInit } from '@angular/core';
import { DatasourceService, Person } from '@sazalex/datasource';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'sazalex-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  public people: Observable<Person[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.people = this.route.data.pipe(pluck('list'));
  }
}
