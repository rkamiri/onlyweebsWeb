import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RatingService} from '../shared/service/rating.service';

@Injectable({ providedIn: 'root' })
export class CurrentUserRatingResolver implements Resolve<number> {
    constructor(private service: RatingService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> | Promise<number> | number {
        return this.service.getCurrentUserRatingRatingForThisAnime(route.paramMap.get('id'));
    }
}
