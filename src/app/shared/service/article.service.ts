import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Article} from '../model/article';

@Injectable({providedIn: 'root'})
export class ArticleService {
    constructor(private httpclient: HttpClient) {
    }
    getAllArticles(): Observable<any> {
        return this.httpclient.get<string>(environment.backend + '/articles');
    }

    getArticle(id: number): Observable<any> {
        return this.httpclient.get<string>(environment.backend + '/articles/' + id);
    }
    postImage(formData): Observable<any> {
        const headers = new HttpHeaders({Accept: 'application/json'});
        const options = {headers};
        return this.httpclient.post<number>(environment.backend + '/image/article-image/', formData, options);
    }
    postArticle(content: Article): Observable<any> {
        return this.httpclient.post<number>(environment.backend + '/articles', content);
    }
}
