import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Anime} from '../model/anime';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AnimeService {

    constructor(private httpclient: HttpClient) {
    }

    getAllAnimes(): Observable<Anime[]> {
        return this.httpclient.get<Anime[]>(environment.backend + '/animes/all/');
    }

    getAllPages(): Observable<number> {
        return this.httpclient.get<number>(environment.backend + '/animes/count');
    }

    getAnimesByPage(page: number): Observable<Anime[]> {
        const numpage = page - 1;
        return this.httpclient.get<Anime[]>(environment.backend + '/animes/pagination/' + numpage);
    }

    getOneAnime(id): Observable<Anime> {
        console.log('i am here');
        return this.httpclient.get<Anime>(environment.backend + '/animes/' + id);
    }

    getAllAnimeByName(term: string, page: number): Observable<Anime[]> {
        return this.httpclient.get<Anime[]>(environment.backend + '/animes/research/' + term + '/pagination/' + (page - 1));
    }

    getAllPagesSearch(search: string): Observable<number> {
        return this.httpclient.get<number>(environment.backend + '/animes/research/' + search + '/count');
    }
}
