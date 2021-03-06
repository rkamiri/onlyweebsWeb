import { Component, OnInit } from '@angular/core';
import * as DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { FormControl, FormGroup } from '@angular/forms';
import { Article } from '../shared/model/article';
import { ArticleService } from '../shared/service/article.service';
import { Router } from '@angular/router';
import { ImageService } from '../shared/service/image.service';
import { ArticleCategories } from '../shared/model/articleCategories';

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
    public categories: ArticleCategories[];
    public selectedCategory: ArticleCategories;
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
        this.categories = [];
        this.articleService.getAllCategories().subscribe((data) => {
            this.categories = data;
            this.selectedCategory = this.categories[0];
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
            category: this.selectedCategory,
        };
        this.imageService.postArticleImage(this.formData).subscribe(() => {
            this.articleService.postArticle(article).subscribe((data) => {
                this.route.navigate(['/articles/' + data]).then();
            });
        });
    }

    changeCategory($event: ArticleCategories): void {
        this.selectedCategory = $event;
    }
}
