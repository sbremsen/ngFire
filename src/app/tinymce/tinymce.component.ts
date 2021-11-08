import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { of, Subscription } from 'rxjs';
import tinymce from 'tinymce';
import { TinyMCEContentModel } from '../core/content.model';
import { ContentService } from '../core/content.service';

@Component({
  selector: 'app-tinymce',
  templateUrl: './tinymce.component.html',
  styleUrls: ['./tinymce.component.css']
})
export class TinymceComponent implements OnInit, OnDestroy {
  @Output() htmlContentEdited = new EventEmitter<string>();

  dbContent: TinyMCEContentModel;
  items: TinyMCEContentModel[];
  pages: TinyMCEContentModel[];
  sub: Subscription;
  userId = 'EvmklkF3DpN0n6fRFx8ZXik7w4J2';
  selectedPageTitle = '';
  pageSection = 1;
  constructor(private contentService: ContentService) { }

   ngOnInit() {
    this.getPagesForUser();
    if (this.selectedPageTitle === '') {
      this.getContent('Home');
    } else {
      this.getContent(this.selectedPageTitle);
    }


    tinymce.init({
      selector: 'div#mymce1',
      plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'table emoticons template paste help'
      ],
      toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | link image | print preview media fullpage | ' +
        'forecolor backcolor emoticons | help',
      menu: {
        favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
      },
      height: 700,
      inline: true
    });

  }

  setContent(htmlContent: string) {
    tinymce.get("mymce1").setContent(htmlContent);
    this.htmlContentEdited.emit(htmlContent);
  }

  async getContent(pageTitle: string){
    let data : TinyMCEContentModel = {};
    let content: string = '';
    const pages$ = await this.contentService.getContentByUserId(this.userId, pageTitle)
      .subscribe(response => {
         content = response.content;
        this.setContent(content);
      });

    return content;
  }

  getPagesForUser() {
    const pages$ = this.contentService.getPagesByUserId(this.userId)
      .subscribe(response => {
        // load all pages for authenticated user
        this.pages = response;
      })
  }

  handleSaveClick(event) {
    debugger;
    let content =  tinymce.activeEditor.getContent();
    console.log(event);
    var data : TinyMCEContentModel = {
      content: content,
      uid: this.userId,
      pageTitle : 'Home',
      pageSection : 1,
    }
    // this.contentService.updateContent(data);

    this.contentService.saveContent(data);
  }

  handleUpdateClick(event) {
    debugger;
    let content =  tinymce.activeEditor.getContent();
    console.log(event);

    var data : TinyMCEContentModel = {
      content: content,
      uid: 'EvmklkF3DpN0n6fRFx8ZXik7w4J2',
      pageTitle: this.selectedPageTitle,
    }
    this.contentService.updateContent(data, this.userId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updatePage(content: string, pageTitle: string, userId: string) {
    var data : TinyMCEContentModel = {
      content: content,
      uid: userId,
      pageTitle : pageTitle,
    }
    this.contentService.updateContent(data, this.userId);
  }

  selectPage(pageTitle: string) {
    debugger;
    console.log(pageTitle);
    this.selectedPageTitle = pageTitle;
    this.getContent(this.selectedPageTitle);
  }
}
