import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Anime} from '../shared/model/anime';

@Injectable({
    providedIn: 'root'
})
export class AnimeService {

    constructor(private httpclient: HttpClient) {}

    getAllAnime(): Observable<Anime[]> {
        return this.httpclient.get<Anime[]>('http://localhost:6671/animes');
    }

    getOneAnime(id): Observable<Anime> {
        return this.httpclient.get<Anime>('http://localhost:6671/animes/' + id);
    }
}
