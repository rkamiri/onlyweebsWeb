import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchResult} from '../model/searchResult';
import {Observable, of, ReplaySubject} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SearchService {
    // public observableSearch: Observable<Array<SearchResult>>;
    constructor(private httpClient: HttpClient) {
    }

    search(term: string): Observable<Array<SearchResult>> {
        return this.httpClient.get<Array<SearchResult>>('http://localhost:8080' + '/animes/research/' + term);
    }

}
