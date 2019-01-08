import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sazalex-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
  
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phone: [''],
    subject: [''],
    message: [''],
    recaptchaReactive: [null, Validators.required],
    privacy: [false, Validators.required]
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private translate: TranslateService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post('/contacts', this.contactForm.value).subscribe( (res: any) => {
      this.contactForm.reset();
      this.translate.get(`CONTACTS.${res.msg.toUpperCase()}`).subscribe( feedback => {
        alert(feedback);
      })
    })
  }
}
