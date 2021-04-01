import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Anime} from '../model/anime';
import {Lists} from '../model/lists';

@Injectable({
    providedIn: 'root'
})
export class ListsService {

    constructor(private httpclient: HttpClient) {}

    getAllLists(): Observable<Lists[]> {
        return this.httpclient.get<Lists[]>('http://localhost:8080/lists');
    }

    getOneListById(id): Observable<Lists> {
        return this.httpclient.get<Lists>('http://localhost:8080/lists/' + id);
    }

    getOneListContentByID(id): Observable<Anime[]> {
        return this.httpclient.get<Anime[]>('http://localhost:8080/lists/' + id + '/content');
    }

    createList(value: object): Observable<any> {
        return this.httpclient.post('http://localhost:8080/create-list', value);
    }
}
