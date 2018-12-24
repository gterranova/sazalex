import { Component, OnInit, Input } from '@angular/core';

export const enum BannerType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  IMAGE = 'image'
}

@Component({
  moduleId: module.id,
  selector: 'sazalex-hero-banner',
  templateUrl: './hero-banner.component.html'
})
export class HeroBannerComponent implements OnInit {
  @Input()
  heading: string;
  @Input()
  subHeading: string;
  @Input()
  bgImage: string;
  @Input()
  type: BannerType = BannerType.PRIMARY;

  constructor() {}

  ngOnInit() {}

  setMyStyle() {
    switch (this.type) {
      case BannerType.IMAGE:
        return {
          'background-image': `url(assets/${this.bgImage})`,
          'background-repeat': 'no-repeat',
          'background-size': 'cover',
          'background-position': 'center'
        };
      case BannerType.SECONDARY:
      case BannerType.PRIMARY:
      default:
        return {};
    }
  }
}
