import { Injectable, Inject, Optional, PLATFORM_ID, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RouterDrawerActions } from './router-drawer-content/router-drawer-actions.interface';
import { DatasourceService, Page } from '@sazalex/datasource';

import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

const PAGES_INFO_KEY = makeStateKey('pages_info');

export interface MenuItem {
  path: string;
  logo?: string;
  title: string;
  hash?: string;
  navigationAction?: string;
  backLink?: string;
  icon?: string;
  actions?: MenuItem[];
  showAsPopupActionItem?: boolean;
  showAsDrawerItem?: boolean;
  actionBarHidden?: boolean;
  actionItemsHidden?: boolean;
  menuItems?: MenuItem[];
  drawerItems?: MenuItem[];
  opacityTopScrollPosition?: number;
  url?: any;
}

@Injectable({
  providedIn: 'root'
})
export class RouteChangeService implements OnDestroy {
  pages: Page[] = [];
  activeMenuItem$: BehaviorSubject<MenuItem> = new BehaviorSubject<MenuItem>({
    path: '',
    title: '',
    icon: ''
  });
  // loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  navigationSubscription;
  drawerHolder: RouterDrawerActions;
  closeDrawerOnRouteChange: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute,
    private dataSourceService: DatasourceService,
    private state: TransferState,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId /*, private titleService: Title*/) {
      this.pages = this.state.get(PAGES_INFO_KEY, []);

      this.navigationSubscription = this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(_ => this.route.snapshot.firstChild)
      )
      .subscribe((route: ActivatedRouteSnapshot) => {
        let active = route.data && route.data.pageInfo ? <MenuItem>route.data.pageInfo : undefined;
        if (!active) {
          active = this.activeMenuItem$.getValue();
        }
        active.url = this.route.snapshot['_routerState'].url;
        if (/^\/(en|it)/.test(active.url)) {
          let lang = active.url.match(/^\/(en|it)/)[1];
          if (this.translate.currentLang !== lang) {
            this.translate.use(lang);
            //console.log("Setting language on route change service", lang);
          }
        }
        active.hash = active.hash || this.hash(active);
        // console.log('Active hash:', active, active.hash);
        // if (active && active.title) {
        //   this.titleService.setTitle(active.title);
        // }
        if (!this.pages.length) {
          this.loadPages();
        }
        this.state.remove(PAGES_INFO_KEY);
        this.activeMenuItem$.next(active);
      });
  }

  loadPages() {
    this.dataSourceService.getAllPages().subscribe(pages => {
      this.pages = pages;
      if (isPlatformServer(this.platformId)) {
        this.state.set(PAGES_INFO_KEY, pages);
      }
      this.activeMenuItem$.next(this.activeMenuItem$.getValue());
    });
  }
  /*
    get loading() {
        return this.loading$.asObservable();
    }
    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
      if (event instanceof NavigationStart) {
          this.activeMenuItem$.next({path: '', title: '', icon: ''});
        this.loading$.next(true);
      }
      if (event instanceof NavigationEnd) {
          this.loading$.next(false);
      }

      // Set loading state to false in both of the below events to hide the spinner in case a request fails
      if (event instanceof NavigationCancel) {
          this.loading$.next(false);
      }
      if (event instanceof NavigationError) {
          this.loading$.next(false);
      }
    }
    */

  setDrawerHolder(
    drawerHolder: RouterDrawerActions,
    closeDrawerOnRouteChange: boolean = true
  ) {
    this.drawerHolder = drawerHolder;
    this.closeDrawerOnRouteChange = closeDrawerOnRouteChange;
  }

  get activeMenuItem() {
    return this.activeMenuItem$.asObservable();
  }

  set activeMenuItem(menu: any) {
    this.activeMenuItem$.next(menu);
  }

  get title() {
    return this.activeMenuItem$.getValue().title;
  }
  set title(title: string) {
    const active = this.activeMenuItem$.getValue();
    active.title = title;
    // console.log('Change title to:', title);
    this.activeMenuItem$.next(active);
  }

  getMenuItems(): MenuItem[] {
    return this.pages.filter(page => {
      return /-page$/.test(page.type) && page.title && page.showAsPopupActionItem;
    }).map(page => <MenuItem>{ ...page, path: page.type.replace(/-page$/, '') });
    /*
    return (
      this.router.config
        // only add a menu item for routes with a title set.
        .filter(route => {
          const { data={}} = route;
          const hash = this.hash(data.pageInfo);
          return (
            data.pageInfo &&
            data.pageInfo.title &&
            !!data.pageInfo.showAsPopupActionItem &&
            hash !== this.activeMenuItem$.getValue().hash
          );
        })
        .map(route => {
          return <MenuItem>Object.assign({ path: route.path }, route.data.pageInfo);
        })
    );
    */
  }

  getDrawerItems(): MenuItem[] {
    return this.pages.filter(page => {
      return /-page$/.test(page.type) && page.title && page.showAsDrawerItem;
    }).map(page => <MenuItem>{ ...page, path: page.type.replace(/-page$/, '') });
    /*
    return (
      this.router.config
        // only add a menu item for routes with a title set.
        .filter(
          route => {
            const { data={}} = route;
            return data.pageInfo && data.pageInfo.title && !!data.pageInfo.showAsDrawerItem;
          }
        )
        .map(route => {
          return <MenuItem>Object.assign({ path: route.path }, route.data.pageInfo);
        })
    );
    */
  }

  onDrawerButtonTap(drawerItem: MenuItem): boolean {
    this.router.navigate([this.translate.currentLang, '/' + drawerItem.path]);
    if (this.drawerHolder && this.closeDrawerOnRouteChange) {
      this.drawerHolder.closeDrawer();
    }
    return false;
  }

  onToolbarButtonTap(toolbarItem: MenuItem): boolean {
    this.router.navigate([this.translate.currentLang, toolbarItem.path]);
    if (this.drawerHolder && this.closeDrawerOnRouteChange) {
      this.drawerHolder.closeDrawer();
    }
    return false;
  }

  onNavButtonTap(navItem: MenuItem): void {
    if (navItem.navigationAction === 'menu') {
      if (this.drawerHolder) {
        this.drawerHolder.toggleDrawer();
      }
    }
  }
  /*
  private lastRouteWithMenuItem(route: ActivatedRoute): MenuItem {
    let lastMenu: MenuItem;
    do {
      lastMenu = this.extractMenu(route) || lastMenu;
    } while ((route = route.firstChild));
    return <MenuItem>(
      Object.assign({ path: '', opacityTopScrollPosition: 0 }, lastMenu)
    );
  }
  
  private extractMenu(route: ActivatedRouteSnapshot): MenuItem {
    const cfg = route.data;
    console.log("extractMenu", cfg);
    return cfg && cfg.pageInfo ? <MenuItem>cfg.pageInfo : undefined;
  }
  */
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private hash(s) {
    if (!s) {
      return '';
    }
    s = JSON.stringify(s);
    // Simple hash function
    let a = 1,
      c = 0,
      h,
      o;
    if (s) {
      a = 0;
      // jshint plusplus:false bitwise:false
      for (h = s.length - 1; h >= 0; h--) {
        o = s.charCodeAt(h);
        // tslint:disable-next-line:no-bitwise
        a = ((a << 6) & 268435455) + o + (o << 14);
        // tslint:disable-next-line:no-bitwise
        c = a & 266338304;
        // tslint:disable-next-line:no-bitwise
        a = c !== 0 ? a ^ (c >> 21) : a;
      }
    }
    return String(a);
  }

}
