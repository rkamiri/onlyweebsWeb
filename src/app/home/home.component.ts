import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../shared/service/article.service';
import { Article } from '../shared/model/article';
import { Lists } from '../shared/model/lists';
import { AnimeService } from '../shared/service/anime.service';
import { AnimeDto } from '../shared/model/anime';
import { ListsService } from '../shared/service/lists.service';
import { environment } from '../../environments/environment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	public lists: Lists[];
	public articles: Article[];
	public animes: AnimeDto[];
	public imagesUrls: string[];
	public imageObject: Array<object> = [];

	constructor(
		private router: Router,
		private articleService: ArticleService,
		private animeService: AnimeService,
		private listsService: ListsService
	) {
		this.imagesUrls = [];
	}

	ngOnInit(): void {
		this.fillArraysWithData();
	}

	fillArraysWithData(): void {
		this.listsService.getCustomLists().subscribe((data) => (this.lists = data.slice(0, 5)));
		this.animeService.getLatest().subscribe((data) => {
			this.animes = data;
			for (let i = 0; i < this.animes.length; i++) {
				const obj = {
					thumbImage: data[i].imgUrl,
					title: data[i].titleEnglish,
				};
				this.imageObject.push(obj);
			}
		});
		this.articleService.getFiveArticles().subscribe((data) => {
			this.articles = data;
			data.forEach((article) => this.imagesUrls.push(environment.backend + '/image/' + article.cover.id));
		});
	}

	goToAnime($event): void {
		const id = this.animes[$event].id;
		this.router.navigate(['/animes/', id]).then();
	}
}
