import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { AnimeDto } from '../model/anime'
import { Observable } from 'rxjs'
import { ArticleService } from '../service/article.service'

@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<AnimeDto> {
	constructor(private service: ArticleService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AnimeDto> | Promise<AnimeDto> | AnimeDto {
		return this.service.getArticle(+route.paramMap.get('id'))
	}
}
