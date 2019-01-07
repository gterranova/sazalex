import { Component, OnInit, NgZone, ElementRef, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RouteChangeService, MenuItem } from '../route-change.service';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  moduleId: module.id,
  selector: 'sazalex-router-toolbar',
  templateUrl: './router-toolbar.component.html'
})
export class RouterToolbarComponent implements OnInit {
  @Input() showNavigationAction = false;
  @Input() showToolbarItemsInline = true;
  toolbarItems: MenuItem[];
  activeMenuItem$: Observable<MenuItem>;
  initialToolbarOpacity = 0.75;
  toolbarOpacity = 0.0;
  scrollingSubscription: any = null;
  drawerItems: MenuItem[];

  scrollPosTop = 0;
  
  constructor(
    private location: Location,
    private router: Router,
    private menuService: RouteChangeService,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone,
    private el: ElementRef,
    private sanitization:DomSanitizer,
    private translate: TranslateService
  ) {
    this.activeMenuItem$ = menuService.activeMenuItem.pipe(
      tap((active: MenuItem) => {
        this.setupOpacity(active);
        this.toolbarItems = !!active.actionItemsHidden
          ? []
          : menuService
              .getMenuItems();
        return active;
      })
    );
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  setupOpacity(active: MenuItem) {
    active.opacityTopScrollPosition = active.opacityTopScrollPosition || 0;

    this.scrollDispatcher
      .getAncestorScrollContainers(this.el)
      .forEach(element => {
        element.scrollTo({ top: 0, left: 0 });
        this.toolbarOpacity = active.opacityTopScrollPosition === 0 ? 1 : this.initialToolbarOpacity;
        this.scrollPosTop = 0;
      });
    if (this.scrollingSubscription) {
      this.scrollingSubscription.unsubscribe();
      this.scrollingSubscription = null;
    }
    this.scrollingSubscription = this.scrollDispatcher
      .scrolled()
      .pipe(
        map(
          (event: CdkScrollable) =>
            event.getElementRef().nativeElement.scrollTop
        )
      )
      .subscribe(scrollTop =>
        this.ngZone.run(() => {
          this.scrollPosTop = scrollTop;
          if (active.opacityTopScrollPosition > 0) {
            this.toolbarOpacity = Math.min(
              1,
              this.initialToolbarOpacity + 1.0 * (scrollTop / active.opacityTopScrollPosition)
            );
          } else {
            this.toolbarOpacity = 1;
          }
        })
      );
  }

  getBackgroundColor() {
    // #efede9
    return this.sanitization.bypassSecurityTrustStyle(`rgba(239,237,233,${this.toolbarOpacity})`);
  }

  getBoxShadow() {
    return this.sanitization.bypassSecurityTrustStyle(`0 1px 3px rgba(0,0,0,${this.scrollPosTop > 0?'.25':'0'})`);
  }

  onToolbarButtonTap(toolbarItem: MenuItem, event): void {
    this.menuService.onToolbarButtonTap(toolbarItem);
  }

  onNavButtonTap(active: MenuItem, event): void {
    event.target.blur();
    if (active.navigationAction === 'menu') {
      this.menuService.onNavButtonTap(active);
    } else if (active.backLink) {
      this.router.navigate([active.backLink]);
    } else {
      this.location.back();
    }
  }

  onLangSelect(active: MenuItem, lang: string) {
    if (lang !== this.translate.currentLang) {
      this.translate.use(lang);
      const urlSegments = active.url.split('?')[0].split('/').slice(1);
      this.router.navigate(urlSegments, {
        queryParams: lang !== this.translate.defaultLang? { lang } : undefined
      });  
    }
  }
}
