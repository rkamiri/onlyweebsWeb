import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Anime} from '../model/anime';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AnimeService {

    constructor(private httpclient: HttpClient){}

    getAllPages(): Observable<number> {
        return this.httpclient.get<number>(environment.backend + '/animes/pagination/count');
    }
    getAllAnime(page: number): Observable<Anime[]> {
        return this.httpclient.get<Anime[]>(environment.backend + '/animes/pagination/' + (page - 1));
    }

    getOneAnime(id): Observable<Anime> {
        return this.httpclient.get<Anime>(environment.backend + '/animes/' + id);
    }

    getAllAnimeByName(term: string): Observable<Anime[]> {
        return this.httpclient.get<Anime[]>(environment.backend + '/animes/research/' + term);
    }
}
