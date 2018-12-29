import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from './components/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './components/rename-dialog/rename-dialog.component';
import { DatasourceService, FileElement } from '@sazalex/datasource';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';

@Component({
  selector: 'sazalex-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {
  constructor(private dataSource: DatasourceService, public dialog: MatDialog) {}

  @Input() fileElements: FileElement[];

  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{ element: FileElement; moveTo: FileElement }>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();

  allFiles: FileElement[];
  path: string;
  currentRootStack: string[] = [];
  canNavigateUp: boolean = false;

  ngOnInit() {
    this.updateFileList();
  }

  updateFileList() {
    let ds;
    if (!this.currentRootStack.length) {
      ds = this.dataSource.getAllFiles();
    } else {
      ds = this.dataSource.getFiles(this.currentRootStack[this.currentRootStack.length-1]);
    }
    ds.subscribe(files => {
      this.fileElements = files;
    });
  }

  deleteElement(element: FileElement) {
    this.dataSource.deleteFiles(element._id).subscribe();
    this.updateFileList();
    this.elementRemoved.emit(element);
  }

  navigate(element: FileElement) {
    if (element.isFolder) {
      this.navigateToFolder(element);
      this.navigatedDown.emit(element);
    }
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
      }
    });
  }

  openRenameDialog(element: FileElement) {
    let dialogRef = this.dialog.open(RenameDialogComponent,{
      data: { elementName: element.name }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this.dataSource.updateFiles(element._id, element).subscribe(e => {
          this.updateFileList();
          this.elementRenamed.emit(element)});
      }
    });
  }

  openUploadDialog() {
    let dialogRef = this.dialog.open(UploadDialogComponent, {
      height: '400px',
      width: '600px',
      data: { uploadFolder: this.path }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.updateFileList();
      }
    });
  }

  openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }
  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `/${folderName}`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 1, 1);
    p = split.join('/');
    return p;
  }  

  navigateToFolder(element: FileElement) {
    this.currentRootStack.push(element._id);
    this.path = this.pushToPath(this.path, element.name);
    this.updateFileList();
    this.canNavigateUp = true;
  }

  navigateUp() {
    this.currentRootStack.pop();
    this.path = this.popFromPath(this.path);
    this.canNavigateUp = !!this.currentRootStack.length;
    this.updateFileList();
    this.navigatedUp.emit();
  }

}
