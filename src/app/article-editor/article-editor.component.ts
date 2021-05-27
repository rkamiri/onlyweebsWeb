import { Component, OnInit } from '@angular/core';
import * as DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { FormControl, FormGroup } from '@angular/forms';
import { Article } from '../shared/model/article';
import { ArticleService } from '../shared/service/article.service';
import { Router } from '@angular/router';
import { ImageService } from '../shared/service/image.service';

@Component({
    selector: 'app-article-editor',
    templateUrl: './article-editor.component.html',
    styleUrls: ['./article-editor.component.css'],
})
export class ArticleEditorComponent implements OnInit {
    public Editor = DocumentEditor;
    public body: string;
    public articleInfos: FormGroup;
    private formData: FormData;

    constructor(
        private articleService: ArticleService,
        private route: Router,
        private imageService: ImageService
    ) {}

    ngOnInit(): void {
        this.formData = new FormData();
        this.articleInfos = new FormGroup({
            title: new FormControl(''),
        });
    }

    onReady(editor): void {
        editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
            );
    }

    fileChange(event): void {
        const fileList: FileList = event.target.files;
        const file: File = fileList[0];
        this.formData.append('uploadFile', file, file.name);
    }

    submit(): void {
        const article: Article = {
            id: null,
            title: this.articleInfos.get('title').value,
            body: this.body,
            created_at: null,
            author: null,
            cover: null,
        };
        this.imageService.postArticleImage(this.formData).subscribe(() => {
            this.articleService.postArticle(article).subscribe((data) => {
                this.route.navigate(['/articles/' + data]).then();
            });
        });
    }
}
