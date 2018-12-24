import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sazalex-hero-profile-banner',
  templateUrl: './hero-profile-banner.component.html'
})
export class HeroProfileBannerComponent implements OnInit {
  @Input()
  data: any;

  constructor() {}

  ngOnInit() {}
}
