import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Anime} from '../model/anime';
import {Lists} from '../model/lists';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ListsService {

    constructor(private httpclient: HttpClient) {}

    getAllLists(): Observable<Lists[]> {
        return this.httpclient.get<Lists[]>(environment.backend + '/lists');
    }

    getOneListById(id): Observable<Lists> {
        return this.httpclient.get<Lists>(environment.backend + '/lists/' + id);
    }

    getOneListContentByID(id): Observable<Anime[]> {
        return this.httpclient.get<Anime[]>(environment.backend + '/lists/' + id + '/content');
    }
}
