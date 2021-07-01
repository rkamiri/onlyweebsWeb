import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { AnimeDto } from '../model/anime';
import { Observable } from 'rxjs';
import { AnimeService } from '../service/anime.service';

@Injectable({ providedIn: 'root' })
export class AnimeListResearchResolver implements Resolve<AnimeDto[]> {
    constructor(private service: AnimeService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<AnimeDto[]> | Promise<AnimeDto[]> | AnimeDto[] {
        return null;
        // return this.service.getAllAnimeByName(route.paramMap.get('research'), +route.paramMap.get('page'));
    }
}
