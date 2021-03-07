import { Component, ViewEncapsulation  } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
declare var tinymce: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'ngFire';
  selectedFile = null;

  constructor() {
    // https://youtu.be/YkvqLNcJz3Y
    // Google Cloud Function
  }

  onFileSelected(event) {
    console.log(event);
   // this.selectedFile = event.target.files[0];
  }

  onUpload() {

  }

  logout() {

  }


}
