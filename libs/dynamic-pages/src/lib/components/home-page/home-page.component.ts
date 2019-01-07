import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { DatasourceService, News } from '@sazalex/datasource';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sazalex-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  images = ['assets/sz-header-a1-home.jpg'];
  news = [];
  public carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide: 1,
    speed: 600,
    interval: {
      timing: 8000,
      initialDelay: 8000
    },
    point: {
      visible: true,
      hideOnSingleSlide: true
    },
    load: 2,
    velocity: 0,
    loop: true,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };
  public newsConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
    slide: 1,
    speed: 600,
    interval: {
      timing: 3000,
      initialDelay: 1000
    },
    point: {
      visible: true,
      hideOnSingleSlide: true
    },
    load: 2,
    velocity: 0,
    loop: true,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  constructor(
    private datasource: DatasourceService,
    private cd: ChangeDetectorRef,
    private translate: TranslateService) { }

  ngOnInit() {
    this.datasource.getAllNews().subscribe(news => {
      this.news = news.length ? news.filter( (n: News) => n.featured) : [];
      this.cd.detectChanges();
    });
  }

  newsLink(news: News) {
    if (!news.content) {
      return ['', this.translate.currentLang, 'news'];
    }
    return ['', this.translate.currentLang, 'news', news.slug? news.slug : news._id];
  }

  practiceLink(practiceKey: string) {
    return this.translate.get(practiceKey).pipe( map( practiceSlug => ['', this.translate.currentLang, 'practices', practiceSlug]));
  }
}
