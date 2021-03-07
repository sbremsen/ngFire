import { Component, OnInit, Input } from '@angular/core';
import { TinymceComponent } from '../tinymce/tinymce.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncSubject, Subject } from 'rxjs';
// import { maxLength } from '../core/maxlength.validator';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @Input() htmlContent: string = null;
  private editorSubject: Subject<any> = new AsyncSubject();

  public myForm = new FormGroup({
    title: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)
  });

  constructor(private editor: TinymceComponent) {
 //   editor.htmlContent.subscribe(res => {
  //     this.htmlContent = res;
  //   });
  }

  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  onSubmit(){

  }

  ngOnInit() {
  }

}
