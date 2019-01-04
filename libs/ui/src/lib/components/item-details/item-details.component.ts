import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatasourceService } from '@sazalex/datasource';
import { MdEditorWidgetComponent } from '@sazalex/markdown-editor';

@Component({
  selector: 'sazalex-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  collectionUrl: string;
  id: string = null;
  initialdata: any = null;
  formActive = true;
  myWidgets = {
    textarea: MdEditorWidgetComponent // Add new 'custom-control' widget
  }

  @Input() form: any;
  
  jsonFormObject: any;
  jsonFormOptions: any = {
    addSubmit: true, // Add a submit button if layout does not have one
    debug: false, // Don't show inline debugging information
    loadExternalAssets: true, // Load external css and JavaScript for frameworks
    returnEmptyFields: true, // Don't return values for empty input fields
    setSchemaDefaults: true, // Always use schema defaults for empty fields
    defautWidgetOptions: { feedback: true } // Show inline feedback icons
  };

  constructor(private router: Router, private datasourceService: DatasourceService) { }

  ngOnInit() {
    this.collectionUrl = this.router.url.split('/').slice(0,2).join('/');
    const { schema, data, layout } = this.form; 
    this.id = data._id ? data._id : null;
    this.initialdata = JSON.parse(JSON.stringify(data));
    this.jsonFormObject = { layout: [layout, {
      type: 'flex',
      'flex-flow': 'row',
      items: [
        { type: 'submit', title: 'Save' },
        { type: 'button', title: 'Cancel', color: 'basic', onClick: () => this.doCancel() },
        { type: 'button', title: 'Reset', color: 'basic', onClick: () => this.doReset() },
        { type: 'button', title: 'Delete', color: 'warn', onClick: () => this.doDelete(), disabled: !!!this.id }
      ]
    }], schema, data };
  }

  async doDelete() {
    if (this.id) {
      await this.datasourceService.request('delete', 
        `${this.collectionUrl}/${this.id}`).toPromise();
      this.router.navigate([this.collectionUrl]);
    }
  }

  doCancel() {
    // this.form.reset();
    this.router.navigate([this.collectionUrl]);
  }

  doReset() {
    this.formActive = false;
    this.jsonFormObject = { ...this.jsonFormObject, data: this.initialdata };
    this.formActive = true;
  }

  onSubmit(data) {
    if (!data) {
      return;
    }
    this.datasourceService.request(
      this.id?'update':'push', 
      `${this.collectionUrl}${this.id?'/'+this.id:''}`, data).toPromise()
      .then(() => this.router.navigate([this.collectionUrl]))
      .catch(e => console.log(e));
  }

}
