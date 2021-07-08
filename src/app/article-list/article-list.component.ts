import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/service/article.service';
import { Article } from '../shared/model/article';
import { environment } from '../../environments/environment';
import { ArticleCategories } from '../shared/model/articleCategories';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';

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
	public searchInputValue: string;
	public category: number;
	public query: string;
	public enableLoadMore: boolean;

	constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute) {
		this.articleImageUrls = [];
	}

	ngOnInit(): void {
		this.route.queryParams.subscribe((data) => {
			this.page = 0;
			this.articleImageUrls = [];
			this.listArticlesRunner = [];
			this.listArticles = [];
			this.category = null;
			this.query = null;
			this.enableLoadMore = false;
			if (data.category || data.query) {
				this.category = data.category;
				this.query = data.query;
				this.articleService.getArticlesByParamsAndPage(this.page, this.category, this.query).subscribe((articles) => {
					this.listArticles = articles;
					articles.forEach((article) => this.articleImageUrls.push(environment.backend + '/image/' + article.cover.id));
					if (this.listArticles.length > 5) {
						this.listArticlesRunner = this.listArticles.slice(5, this.listArticles.length + 1);
						if (this.listArticlesRunner.length === 5) {
							this.enableLoadMore = true;
						}
					}
				});
			} else {
				this.articleService.getArticlesByPage(this.page).subscribe((articles) => {
					this.listArticles = articles;
					articles.forEach((article) => this.articleImageUrls.push(environment.backend + '/image/' + article.cover.id));

					if (this.listArticles.length > 5) {
						this.listArticlesRunner = this.listArticles.slice(5, this.listArticles.length + 1);
						if (this.listArticlesRunner.length === 5) {
							this.enableLoadMore = true;
						}
					}
				});
			}
		});
		this.articleService.getAllCategories().subscribe((data) => {
			this.categories = data;
		});
	}

	searchWithParams(): void {
		this.router
			.navigate(['articles/'], {
				queryParams: {
					category: this.selectedCategory ? this.selectedCategory.id : null,
					query: this.searchInputValue,
				},
			})
			.then();
	}

	loadMore(): void {
		this.page++;
		if (this.category) {
			this.articleService.getArticlesByParamsAndPage(this.page, this.category, this.query).subscribe((data) => {
				data.forEach((article) => this.articleImageUrls.push(environment.backend + '/image/' + article.cover.id));
				this.listArticlesRunner = this.listArticlesRunner.concat(data);
				if (data.length < 5) {
					this.enableLoadMore = false;
				}
			});
		} else {
			this.articleService.getArticlesByPage(this.page).subscribe((data) => {
				data.forEach((article) => this.articleImageUrls.push(environment.backend + '/image/' + article.cover.id));
				this.listArticlesRunner = this.listArticlesRunner.concat(data);
				if (data.length < 5) {
					this.enableLoadMore = false;
				}
			});
		}
	}

	changeCategory($event: ArticleCategories): void {
		this.selectedCategory = $event;
	}
}
