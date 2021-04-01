import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Anime} from '../shared/model/anime';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AnimeService {

    constructor(private httpclient: HttpClient) {
    }

    getAllAnime(): Observable<Anime[]> {
        return this.httpclient.get<Anime[]>(environment.backend + '/animes');
    }

    getOneAnime(id): Observable<Anime> {
        return this.httpclient.get<Anime>(environment.backend + '/animes/' + id);
    }

    getAllAnimeByName(term: string): Observable<Anime[]> {
        return this.httpclient.get<Anime[]>(environment.backend + '/animes/research/' + term);
    }
}
