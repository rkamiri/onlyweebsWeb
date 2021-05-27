import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { ListsService } from '../service/lists.service';
import { Observable } from 'rxjs';
import { Anime } from '../model/anime';

@Injectable({ providedIn: 'root' })
export class ListContentResolver implements Resolve<Anime[]> {
    constructor(private service: ListsService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Anime[]> | Promise<Anime[]> | Anime[] {
        return this.service.getOneListContentByID(route.paramMap.get('id'));
    }
}
