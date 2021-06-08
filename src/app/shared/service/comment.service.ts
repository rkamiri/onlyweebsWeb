import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Comment } from '../model/comment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    constructor(private httpclient: HttpClient) {}

    getCommentsForAnime(animeId: number): Observable<Comment[]> {
        return this.httpclient.get<Comment[]>(
            environment.backend + '/comment/anime/' + animeId,
            httpOptions
        );
    }

    getCommentsForArticle(articleId: number): Observable<Comment[]> {
        return this.httpclient.get<Comment[]>(
            environment.backend + '/comment/article/' + articleId,
            httpOptions
        );
    }

    getCommentsForLists(listId: number): any {
        return this.httpclient.get<Comment[]>(
            environment.backend + '/comment/list/' + listId,
            httpOptions
        );
    }

    putComment(comment: Comment): Observable<void> {
        return this.httpclient.put<void>(
            environment.backend + '/comment/',
            comment,
            httpOptions
        );
    }

    deleteAnimeComment(animeId: number): any {
        return this.httpclient.delete<any>(
            environment.backend + '/comment/anime/' + animeId,
            httpOptions
        );
    }

    deleteArticleComment(articleId: number): any {
        return this.httpclient.delete<any>(
            environment.backend + '/comment/article/' + articleId,
            httpOptions
        );
    }

    deleteListComment(listId: number): any {
        return this.httpclient.delete<any>(
            environment.backend + '/comment/list/' + listId,
            httpOptions
        );
    }
}
