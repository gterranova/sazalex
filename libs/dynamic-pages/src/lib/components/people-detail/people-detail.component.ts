import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'sazalex-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss']
})
export class PeopleDetailComponent implements PageComponent, OnInit {
  data: any;
  schema: any;
  titleSep = ' | ';

  constructor(
    private title: Title, private meta: Meta,
    private translate: TranslateService) { 
  }

  ngOnInit() {
    if (this.data && this.data.context) {
      const newImage = `https://www.sazalex.com/assets/${this.data.context.image || 'sz-header-a1-home.jpg'}`;
      this.schema = {
        "@context": "http://schema.org",
        "@type": "Person",
        "address": {
          "addressCountry": "IT",
          "addressLocality": "Milano",
          "addressRegion": "Lombardy",
          "postalCode": "20122",
          "streetAddress": "Via Visconti di Modrone, 15",
          "telephone": "+39-02-87046190"
        },
        "jobTitle": this.data.context.role,
        "email": `mailto:${this.data.context.email}`,
        "image": `${this.data.context.image}`,
        "name": `${this.data.context.name} ${this.data.context.surname}`,
        "telephone": this.data.context.phone,
        "inLanguage": this.translate.currentLang,
        "url": `https://www.sazalex.com/it/people/${this.data.context.slug}`
      };

      const title = this.title.getTitle().split(this.titleSep).pop();
      let newTitle = `${this.data.context.name} ${this.data.context.surname}${this.titleSep}${title}`;
      this.title.setTitle(newTitle);

      this.meta.updateTag({ name: 'twitter:image', content: newImage });
      this.meta.updateTag({ property: 'og:image', content: newImage });  
    }    
  }

}
