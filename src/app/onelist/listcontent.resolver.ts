import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ListsService} from '../shared/service/lists.service';
import {Observable} from 'rxjs';
import {Anime} from '../shared/model/anime';

@Injectable({ providedIn: 'root' })
export class ListContentResolver implements Resolve<Anime[]> {
    constructor(private service: ListsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Anime[]> | Promise<Anime[]> | Anime[] {
        return this.service.getOneListContentByID(route.paramMap.get('id'));
    }
}
