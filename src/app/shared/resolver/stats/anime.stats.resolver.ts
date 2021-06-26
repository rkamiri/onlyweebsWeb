import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AnimeStats } from '../../model/anime.stats';
import { StatsService } from '../../service/stats.service';

@Injectable({ providedIn: 'root' })
export class AnimeStatsResolver implements Resolve<AnimeStats[]> {
    constructor(private service: StatsService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<AnimeStats[]> {
        return this.service.getAnimeStats();
    }
}
