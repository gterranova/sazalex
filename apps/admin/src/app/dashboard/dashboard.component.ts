import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@sazalex/auth';

@Component({
  selector: 'sazalex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.user = this.authService.currentUser();
  }
}
