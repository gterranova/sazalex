import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'sazalex-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements PageComponent, OnInit {
  data: any;
  schema: any;
  titleSep = ' | ';

  constructor(
    private title: Title, private meta: Meta,
    private translate: TranslateService) { 
  }

  ngOnInit() {
    if (this.data && this.data.context) {
      const newImage = `https://www.sazalex.com/assets/${this.data.context.image || 'sz-header-a1-news.jpg'}`;
      this.schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": this.data.context.title,
        "about": this.data.context.excerpt,
        "inLanguage": this.translate.currentLang,
        "image": [newImage],
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
 
      const title = this.title.getTitle().split(this.titleSep).pop();
      let newTitle = `${this.data.context.title}${this.titleSep}${title}`;
      this.title.setTitle(newTitle);

      this.meta.updateTag({ name: 'twitter:image', content: newImage });
      this.meta.updateTag({ property: 'og:image', content: newImage });  
   }
  }

}
