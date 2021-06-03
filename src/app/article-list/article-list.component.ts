import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/service/article.service';
import { Article } from '../shared/model/article';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
    public listArticles: Article[];
    public listArticlesRunner: Article[];
    public articleImageUrls: string[];

    constructor(private articleService: ArticleService) {
        this.articleImageUrls = [];
    }

    ngOnInit(): void {
        this.articleService.getAllArticles().subscribe((data) => {
            this.listArticles = data;
            data.forEach((article) =>
                this.articleImageUrls.push(
                    environment.backend + '/image/' + article.cover.id
                )
            );
            if (this.listArticles.length > 5) {
                this.listArticlesRunner = this.listArticles.slice(
                    5,
                    this.listArticles.length + 1
                );
            }
        });
    }
}
