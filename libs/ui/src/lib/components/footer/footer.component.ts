import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'sazalex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit() {
  }

}
