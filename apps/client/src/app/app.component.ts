import { Component, Input, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import {TranslateService} from '@ngx-translate/core';
import {
  RouteChangeService,
  RouterDrawerActions
} from '@sazalex/router-directives';
import { Subscription } from 'rxjs';

declare const require: any;

@Component({
  moduleId: module.id,
  selector: 'sazalex-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, RouterDrawerActions {
  @ViewChild('sidedrawerId')
  public drawer: MatSidenav;

  /**
   * The onLangChange subscription to update the component if the language change.
   * @type {any}
   */
  onLangChange: Subscription = undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public el: ElementRef, private menuService: RouteChangeService, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.addLangs(["it", "en"]);
    translate.setDefaultLang('it');
    if (isPlatformBrowser(this.platformId)) {
      this.updateLanguage();
      // Client only code.
      this.onLangChange = this.translate.onLangChange.subscribe(() => {
        this.updateLanguage();
      });    
    }
    if (isPlatformServer(this.platformId)) {
      // Server only code.
    }    
    //let browserLang = translate.getBrowserLang();
    //translate.use(browserLang && browserLang.match(/it|en/) ? browserLang : 'it');

  }

  ngOnInit() {
    this.menuService.setDrawerHolder(this);
  }

  ngOnDestroy() {
    if (this.onLangChange !== undefined) {
      this.onLangChange.unsubscribe();
    }
  }

  /**
   * Update the language in the lang attribute of the html element.
   */
  updateLanguage(): void {
    const lang = (<any>document).createAttribute('lang');
    lang.value = this.translate.currentLang;
    this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(lang);
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
