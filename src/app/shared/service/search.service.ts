import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { SearchResult } from '../model/searchResult'
import { Observable, of, ReplaySubject } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	constructor(private httpClient: HttpClient) {}

	search(term: string): Observable<Array<SearchResult>> {
		return this.httpClient.get<Array<SearchResult>>(environment.backend + '/animes/research/' + term)
	}
}
