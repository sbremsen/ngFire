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
  sub: Subscription;

  constructor(private contentService: ContentService) { }

   ngOnInit() {
     debugger;

    this.getContent();

    tinymce.init({
      selector: 'textarea#mymce1',
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
    });

  }

  setContent(htmlContent: string) {
    tinymce.get("mymce1").setContent(htmlContent);
    this.htmlContentEdited.emit(htmlContent);
  }

  async getContent(){
    let data : TinyMCEContentModel = {};
    let content: string = '';
    var returnValue = await this.contentService
                .getContentForUserPage('EvmklkF3DpN0n6fRFx8ZXik7w4J2')
                .subscribe(response => {
                    this.items = response;

                    content = response[0].content;
                    data.content = content;
                    data.pageSection = response[0].pageSection;
                    data.pageTitle = response[0].pageTitle;
                    this.dbContent = data;
                    this.setContent(content);
                  });
    debugger;
    return content;
  }

  handleSaveClick(event) {
    debugger;
    let content =  tinymce.activeEditor.getContent();

    var data : TinyMCEContentModel = {
      content: content,
      uid: 'EvmklkF3DpN0n6fRFx8ZXik7w4J2',
      pageTitle : 'Home',
      pageSection : 1,
    }
    this.contentService.updateContent(data);

    this.contentService.saveContent(data);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
