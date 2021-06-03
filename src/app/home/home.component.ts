import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../shared/service/article.service';
import { Article } from '../shared/model/article';
import { Lists } from '../shared/model/lists';
import { AnimeService } from '../shared/service/anime.service';
import { Anime } from '../shared/model/anime';
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
    public animes: Anime[];
    public imagesUrls: string[];
    public imageObject: Array<object> = [];
    loaded: boolean;

    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService,
        private animeService: AnimeService,
        private listsService: ListsService
    ) {
        this.loaded = false;
        this.imagesUrls = [];
    }

    ngOnInit(): void {
        this.fillArraysWithData();
        this.setTimeOut();
    }

    fillArraysWithData(): void {
        this.listsService
            .getAllLists()
            .subscribe((data) => (this.lists = data.slice(0, 5)));
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
        this.articleService.getAllArticles().subscribe((data) => {
            this.articles = data.slice(0, 5);
            data.forEach((article) =>
                this.imagesUrls.push(
                    environment.backend + '/image/' + article.cover.id
                )
            );
        });
    }

    setTimeOut(): void {
        setTimeout(() => {
            this.loaded = true;
        }, 100);
    }

    goToAnime($event): void {
        const id = this.animes[$event].id;
        window.open('/#/animes/' + id + '/', '_self');
    }

    getOwner($id): string {
        return null;
    }
}
