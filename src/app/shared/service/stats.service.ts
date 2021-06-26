import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AnimeStats } from '../model/anime.stats';
import { GeneralStats } from '../model/general.stats';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

@Injectable({
    providedIn: 'root',
})
export class StatsService {
    constructor(private httpclient: HttpClient) {}

    getAnimeStats(): Observable<AnimeStats[]> {
        return this.httpclient.get<AnimeStats[]>(
            environment.backend + '/stats/animes-listed'
        );
    }

    getGeneralStats(): Observable<GeneralStats> {
        return this.httpclient.get<GeneralStats>(
            environment.backend + '/stats/general'
        );
    }

    getCommentStats(): Observable<number> {
        return this.httpclient.get<number>(
            environment.backend + '/stats/comments-by-user'
        );
    }
}
