import { Component, OnInit } from '@angular/core';
import * as DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {
    public Editor = DocumentEditor;
    public model: string;
    constructor() { }

    ngOnInit(): void {
    }
    onReady( editor ): void {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }

    onAziz(): void {
        console.log(this.model);
    }
}
