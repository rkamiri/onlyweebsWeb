import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Article } from '../model/article';
import { ArticleCategories } from '../model/articleCategories';

@Injectable({ providedIn: 'root' })
export class ArticleService {
    constructor(private httpclient: HttpClient) {}

    getAllArticles(): Observable<any> {
        return this.httpclient.get<string>(environment.backend + '/articles');
    }

    getArticle(id: number): Observable<any> {
        return this.httpclient.get<string>(
            environment.backend + '/articles/' + id
        );
    }

    postArticle(content: Article): Observable<any> {
        return this.httpclient.post<number>(
            environment.backend + '/articles',
            content
        );
    }

    getAllCategories(): Observable<ArticleCategories[]> {
        return this.httpclient.get<ArticleCategories[]>(
            environment.backend + '/article-categories/all'
        );
    }

    getArticlesByPage(page: number): Observable<Article[]> {
        return this.httpclient.get<Article[]>(
            environment.backend + '/articles/page/' + page
        );
    }

    getArticlesByParamsAndPage(
        page: number,
        categoryId: number,
        title: string
    ): Observable<Article[]> {
        if (!categoryId) {
            categoryId = null;
        }
        return this.httpclient.post<Article[]>(
            environment.backend + '/articles/research/page/' + page,
            {
                title,
                categoryId,
            }
        );
    }

    getSimilarArticles(
        articleId: number,
        category: number
    ): Observable<Article[]> {
        return this.httpclient.get<Article[]>(
            environment.backend +
                '/articles/similar/article_id/' +
                articleId +
                '/category/' +
                category
        );
    }

    deleteArticle(articleId: number): any {
        return this.httpclient.delete(
            environment.backend + '/articles/' + articleId
        );
    }
}
