import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AnimeDto } from '../model/anime'
import { Lists } from '../model/lists'
import { environment } from '../../../environments/environment'

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		responseType: 'text',
	}),
}

@Injectable({
	providedIn: 'root',
})
export class ListsService {
	constructor(private httpclient: HttpClient) {}

	getAllLists(): Observable<Lists[]> {
		return this.httpclient.get<Lists[]>(environment.backend + '/lists')
	}

	getCustomLists(): Observable<Lists[]> {
		return this.httpclient.get<Lists[]>(environment.backend + '/lists/custom')
	}

	getMyDefaultLists(): Observable<Lists[]> {
		return this.httpclient.get<Lists[]>(environment.backend + '/lists/user/default/' + sessionStorage.getItem('userid'))
	}

	getMyCustomLists(): Observable<Lists[]> {
		return this.httpclient.get<Lists[]>(environment.backend + '/lists/user/custom/' + sessionStorage.getItem('userid'))
	}

	getCustomListsByUserId(id: number): Observable<Lists[]> {
		return this.httpclient.get<Lists[]>(environment.backend + '/lists/user/custom/' + id)
	}

	getOneListById(id): Observable<Lists> {
		return this.httpclient.get<Lists>(environment.backend + '/lists/' + id)
	}

	getOneListContentByID(id): Observable<AnimeDto[]> {
		return this.httpclient.get<AnimeDto[]>(environment.backend + '/lists/' + id + '/content')
	}

	createList(value: object): Observable<any> {
		return this.httpclient.post(environment.backend + '/lists', value)
	}

	putAnimeInList(value: object): Observable<any> {
		return this.httpclient.put(environment.backend + '/lists', value)
	}

	deleteAnimeInList(listId: number, animeId: number): Observable<any> {
		return this.httpclient.delete(environment.backend + '/lists/' + listId + '/' + animeId)
	}

	getLastList(): Observable<Lists> {
		return this.httpclient.get<Lists>(environment.backend + '/lists/getlastlist')
	}

	getListByUserIdAndName(listName: string): Observable<Lists> {
		return this.httpclient.get<Lists>(environment.backend + '/lists/' + sessionStorage.getItem('userid') + '/' + listName)
	}

	getImagesOfAllLists(): Observable<any> {
		return this.httpclient.get<any>(environment.backend + '/lists/spotify/image')
	}

	getImagesOfCustomLists(): Observable<[[]]> {
		return this.httpclient.get<[[]]>(environment.backend + '/lists/spotify/image/custom')
	}

	getImagesOfUserCustomList(): Observable<[[]]> {
		return this.httpclient.get<[[]]>(environment.backend + '/lists/user/image/custom')
	}

	getImagesOfUserCustomListByUserId(id: number): Observable<[[]]> {
		return this.httpclient.get<[[]]>(environment.backend + '/lists/user/' + id + '/image/custom')
	}

	getImagesOfUserDefaultList(): Observable<[[]]> {
		return this.httpclient.get<[[]]>(environment.backend + '/lists/user/image/default')
	}

	deleteList(id: number): any {
		return this.httpclient.delete<any>(environment.backend + '/lists/user/' + id, httpOptions)
	}
}
