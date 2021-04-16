import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Anime} from '../model/anime';
import {Observable} from 'rxjs';
import {AnimeService} from '../service/anime.service';

@Injectable({ providedIn: 'root' })
export class AnimeListResolver implements Resolve<Anime[]> {
    constructor(private service: AnimeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Anime[]> | Promise<Anime[]> | Anime[] {
        return this.service.getAllAnime();
    }
}
