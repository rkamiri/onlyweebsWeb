import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { GeneralStats } from '../../model/general.stats'
import { StatsService } from '../../service/stats.service'

@Injectable({ providedIn: 'root' })
export class GeneralStatsResolver implements Resolve<GeneralStats> {
	constructor(private service: StatsService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GeneralStats> {
		return this.service.getGeneralStats()
	}
}
