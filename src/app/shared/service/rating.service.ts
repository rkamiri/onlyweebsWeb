import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class RatingService {
	constructor(private httpclient: HttpClient) {}

	getCurrentUserRatingForThisAnime(id): Observable<number> {
		return this.httpclient.get<number>(environment.backend + '/rating/user/' + id);
	}

	putCurrentUserRatingOfAnAnime(rating: object): Observable<number> {
		return this.httpclient.put<number>(environment.backend + '/rating', rating);
	}

	getGlobalRatingOfAnAnime(id): Observable<number> {
		return this.httpclient.get<number>(environment.backend + '/rating/' + id);
	}
}
