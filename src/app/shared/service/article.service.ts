import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ArticleService {
    constructor(private httpclient: HttpClient) {
    }
    getAllArticles(): Observable<any> {
        return this.httpclient.get<string>(environment.backend + '/articles');
    }
}
