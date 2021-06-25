import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anime } from '../model/anime';
import { environment } from '../../../environments/environment';
import { Genres } from '../model/genres';
import { Studios } from '../model/studios';
import { Producers } from '../model/producers';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

@Injectable({
    providedIn: 'root',
})
export class AnimeService {
    constructor(private httpclient: HttpClient) {}

    getAllAnimes(): Observable<Anime[]> {
        return this.httpclient.get<Anime[]>(
            environment.backend + '/animes/all/'
        );
    }

    getAllPages(): Observable<number> {
        return this.httpclient.get<number>(
            environment.backend + '/animes/count'
        );
    }

    getAnimesByPage(page: number): Observable<Anime[]> {
        const numpage = page - 1;
        return this.httpclient.get<Anime[]>(
            environment.backend + '/animes/pagination/' + numpage
        );
    }

    getOneAnime(id): Observable<any> {
        return this.httpclient.get<any>(
            environment.backend + '/animes/' + id,
            httpOptions
        );
    }

    getAnimeSynopsis(id): Observable<any> {
        return this.httpclient.get<any>(
            environment.backend + '/animes/' + id + '/synopsis',
            httpOptions
        );
    }

    getAllAnimeByName(term: string, page: number): Observable<Anime[]> {
        return this.httpclient.get<Anime[]>(
            environment.backend +
                '/animes/research/' +
                term +
                '/pagination/' +
                (page - 1)
        );
    }

    getAllPagesSearch(search: string): Observable<number> {
        return this.httpclient.get<number>(
            environment.backend + '/animes/research/' + search + '/count'
        );
    }

    getGenres(id: number): Observable<Genres[]> {
        return this.httpclient.get<Genres[]>(
            environment.backend + '/animes/' + id + '/genres'
        );
    }

    getAllGenres(): Observable<Genres[]> {
        return this.httpclient.get<Genres[]>(
            environment.backend + '/genres/all'
        );
    }

    getStudios(id: number): Observable<Studios[]> {
        return this.httpclient.get<Studios[]>(
            environment.backend + '/animes/' + id + '/studios'
        );
    }

    getAllStudios(): Observable<Studios[]> {
        return this.httpclient.get<Studios[]>(
            environment.backend + '/studios/all'
        );
    }

    getProducers(id: number): Observable<Producers[]> {
        return this.httpclient.get<Producers[]>(
            environment.backend + '/animes/' + id + '/producers'
        );
    }

    getAllProducers(): Observable<Producers[]> {
        return this.httpclient.get<Producers[]>(
            environment.backend + '/producers/all'
        );
    }

    getLatest(): Observable<Anime[]> {
        return this.httpclient.get<Anime[]>(
            environment.backend + '/animes/latest'
        );
    }

    getAllPagesByAdvancedSearch(
        genre: Genres,
        studio: Studios,
        producer: Producers
    ): Observable<number> {
        return this.httpclient.post<number>(
            environment.backend + '/animes/research/count',
            {
                genre,
                studio,
                producer,
            }
        );
    }

    getAllAnimesByAdvancedResearch(
        genre: Genres,
        studio: Studios,
        producer: Producers,
        currentPage: number
    ): Observable<Anime[]> {
        return this.httpclient.post<Anime[]>(
            environment.backend + '/animes/research/pagination/' + currentPage,
            {
                genre,
                studio,
                producer,
            }
        );
    }
}
