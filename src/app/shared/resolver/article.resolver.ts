import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Anime} from '../model/anime';
import {Observable} from 'rxjs';
import {ArticleService} from '../service/article.service';

@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<Anime> {
    constructor(private service: ArticleService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Anime> | Promise<Anime> | Anime {
        return this.service.getArticle(+route.paramMap.get('id'));
    }
}
