import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {TranslateService} from '@ngx-translate/core';
import {
  RouteChangeService,
  RouterDrawerActions
} from '@sazalex/router-directives';

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
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.addLangs(["it", "en"]);
    translate.setDefaultLang('it');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/it|en/) ? browserLang : 'it');

  }

  ngOnInit() {
    this.menuService.setDrawerHolder(this);
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
