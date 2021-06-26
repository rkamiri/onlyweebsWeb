import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StatsService } from '../service/stats.service';

@Injectable({ providedIn: 'root' })
export class CommentStatsResolver implements Resolve<number> {
    constructor(private service: StatsService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<number> {
        return this.service.getCommentStats();
    }
}
