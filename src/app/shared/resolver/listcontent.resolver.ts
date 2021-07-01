import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { ListsService } from '../service/lists.service';
import { Observable } from 'rxjs';
import { AnimeDto } from '../model/anime';

@Injectable({ providedIn: 'root' })
export class ListContentResolver implements Resolve<AnimeDto[]> {
    constructor(private service: ListsService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<AnimeDto[]> | Promise<AnimeDto[]> | AnimeDto[] {
        return this.service.getOneListContentByID(route.paramMap.get('id'));
    }
}
