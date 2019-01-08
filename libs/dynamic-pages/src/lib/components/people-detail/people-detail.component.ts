import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../page.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sazalex-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss']
})
export class PeopleDetailComponent implements PageComponent, OnInit {
  data: any;
  schema: any;
  
  constructor(private translate: TranslateService) { 
  }

  ngOnInit() {
    if (this.data && this.data.context) {
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
    }    
  }

}
