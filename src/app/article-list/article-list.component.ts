import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../shared/service/article.service';
import {Article} from '../shared/model/article';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
    public listArticles: Article[];

    constructor(private articleService: ArticleService) {
    }

    ngOnInit(): void {
        this.articleService.getAllArticles().subscribe((data) => {
            this.listArticles = data;
        });
    }
}
