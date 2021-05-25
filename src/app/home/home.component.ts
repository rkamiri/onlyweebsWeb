import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../shared/service/article.service';
import {Article} from '../shared/model/article';
import {Lists} from '../shared/model/lists';
import {AnimeService} from '../shared/service/anime.service';
import {Anime} from '../shared/model/anime';
import {ListsService} from '../shared/service/lists.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public lists: Lists[];
    public articles: Article[];
    public animes: Anime[];
    public imagesUrls: string[];
    articlesLoaded: boolean;

    constructor(private route: ActivatedRoute,
                private articleService: ArticleService,
                private animeService: AnimeService,
                private listsService: ListsService) {
        this.articlesLoaded = false;
        this.imagesUrls = [];
    }

    ngOnInit(): void {
        this.fillArraysWithData();
        this.setTimeOutForArticles();
    }

    fillArraysWithData(): void {
        this.listsService.getAllLists().subscribe(data => this.lists = data.slice(0, 5));
        this.animeService.getAnimesByPage(1).subscribe(data => {
            this.animes = data.slice(0, 6);
        });
        this.articleService.getAllArticles().subscribe(data => {
            this.articles = data.slice(0, 5);
            data.forEach(article => this.imagesUrls.push(environment.backend + '/image/' + article.cover.id));
        });
    }

    setTimeOutForArticles(): void {
        setTimeout(() => this.articlesLoaded = true, 150);
    }
}
