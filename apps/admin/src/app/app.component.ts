import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  RouteChangeService,
  RouterDrawerActions
} from '@sazalex/router-directives';
import { TranslateService } from '@ngx-translate/core';

declare const require: any;

@Component({
  moduleId: module.id,
  selector: 'sazalex-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, RouterDrawerActions {
  @ViewChild('sidedrawerId')
  public drawer: MatSidenav;

  constructor(private menuService: RouteChangeService, translate: TranslateService) {
    translate.addLangs(["it", "en"]);
    translate.setDefaultLang('it');
    translate.use('it');
  }

  ngOnInit() {
    this.menuService.setDrawerHolder(this, false);
  }

  openDrawer() {
    this.drawer.open();
  }

  closeDrawer() {
    this.drawer.close();
  }

  toggleDrawer() {
    this.drawer.toggle();
  }
}
