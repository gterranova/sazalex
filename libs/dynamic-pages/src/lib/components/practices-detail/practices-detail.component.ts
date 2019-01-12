import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sazalex-practices-detail',
  templateUrl: './practices-detail.component.html',
  styleUrls: ['./practices-detail.component.scss']
})
export class PracticesDetailComponent implements PageComponent, OnInit {
  data: any;
  schema: any;
  titleSep = ' | ';

  constructor(
    private title: Title, private meta: Meta,
    private translate: TranslateService) { 
  }

  ngOnInit() {
    if (this.data && this.data.context) {
      const newImage = `https://www.sazalex.com/assets/${this.data.context.header || 'sz-header-a1-home.jpg'}`;
      this.schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": this.data.context.title,
        "inLanguage": this.translate.currentLang,
        "image": [newImage],
        "datePublished": '2019-01-01',
        "dateModified": '2019-01-01',
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
      let newTitle = `${this.data.context.name}${this.titleSep}${title}`;
      this.title.setTitle(newTitle);

      this.meta.updateTag({ name: 'twitter:image', content: newImage });
      this.meta.updateTag({ property: 'og:image', content: newImage });  
    }
  }

}
