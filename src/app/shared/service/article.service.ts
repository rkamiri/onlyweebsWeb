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
}
