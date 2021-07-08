import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AverageStats } from '../../model/average.stats';
import { StatsService } from '../../service/stats.service';

@Injectable({ providedIn: 'root' })
export class AverageStatsResolver implements Resolve<AverageStats> {
	constructor(private service: StatsService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AverageStats> {
		return this.service.getCommentStats();
	}
}
