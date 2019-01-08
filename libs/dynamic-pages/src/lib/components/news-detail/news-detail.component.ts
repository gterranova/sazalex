import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sazalex-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements PageComponent, OnInit {
  data: any;
  schema: any;
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    if (this.data && this.data.context) {
      this.schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": this.data.context.title,
        "about": this.data.context.excerpt,
        "inLanguage": this.translate.currentLang,
        "image": [
          "https://www.sazalex.com/assets/sz-header-a1-news.jpg"
        ],
        "datePublished": this.data.context.date,
        "dateModified": this.data.context.date,
        "author": {
          "@type": "Organization",
          "name": "Sani Zangrando"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Sani Zangrando",
          "url": "https://www.sazalex.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.sazalex.com/assets/logo.png"
          }
        }
      };      
    }
  }

}
