import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/service/article.service';
import { Article } from '../shared/model/article';
import { environment } from '../../environments/environment';
import { ArticleCategories } from '../shared/model/articleCategories';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
    public listArticles: Article[];
    public listArticlesRunner: Article[];
    public articleImageUrls: string[];
    public categories: ArticleCategories[];
    public selectedCategory: ArticleCategories;
    public page = 0;
    constructor(private articleService: ArticleService) {
        this.articleImageUrls = [];
    }

    ngOnInit(): void {
        this.articleService.getArticlesByPage(this.page).subscribe((data) => {
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
        this.articleService.getAllCategories().subscribe((data) => {
            this.categories = data;
        });
    }
    loadMore(): void {
        this.page++;
        this.articleService.getArticlesByPage(this.page).subscribe((data) => {
            data.forEach((article) =>
                this.articleImageUrls.push(
                    environment.backend + '/image/' + article.cover.id
                )
            );
            this.listArticlesRunner = this.listArticlesRunner.concat(data);
            console.log(this.listArticlesRunner);
        });
    }
    changeCategory($event: ArticleCategories): void {
        this.selectedCategory = $event;
    }
}
