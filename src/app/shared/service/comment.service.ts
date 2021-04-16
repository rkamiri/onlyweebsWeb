import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Comment} from '../model/comment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        responseType: 'text'
    })
};

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private httpclient: HttpClient) {}

    getCommentsForAnime(animeId): Observable<Comment[]> {
        return this.httpclient.get<Comment[]>(environment.backend + '/anime-comment/' + animeId, httpOptions);
    }
    putCommentForAnime(comment: Comment): Observable<void> {
        return this.httpclient.put<void>(environment.backend + '/anime-comment/', comment, httpOptions);
    }
}
