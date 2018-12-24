import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sazalex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  version = '1.0.0';
  constructor() {}

  ngOnInit() {}
}
