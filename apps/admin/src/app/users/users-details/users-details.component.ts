import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, AuthenticationService } from '@sazalex/auth';

declare let require: any;
const formLayout = require('./form-layout.json');

@Component({
  selector: 'sazalex-users-details',
  template: `<div *ngIf="!isLoading" class="mat-elevation-z8 details-container">
    <sazalex-item-details [form]="jsonFormObject"></sazalex-item-details>
  </div>`,
  styles: [``]
})
export class UsersDetailsComponent implements OnInit {
  isLoading = true;
  jsonFormObject: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      const { details = {}, schema } = data;
      this.jsonFormObject = { layout: formLayout, schema, data: details };
      this.isLoading = false;
    });
  }
  /*
  async doDelete() {
    if (this.id) {
      await this.authService.userDelete(this.id).toPromise();
      // this.form.reset();
      this.router.navigate(['/users']);
    }
  }

  doCancel() {
    // this.form.reset();
    this.router.navigate(['/users']);
  }

  doReset() {
    Object.assign(this.details, this.initialdata);
  }

  async onSubmit(data) {
    if (!data) {
      return;
    }
    if (this.id) {
      await this.authService.userUpdate(this.id, data).toPromise();
    } else {
      const user: any = await this.authService.userCreate(data).toPromise();
      this.id = user._id;
    }
    // this.form.reset();
    this.router.navigate(['/users']);
  }
  */
}
