import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../shared/service/article.service';
import {Article} from '../shared/model/article';
import {Lists} from '../shared/model/lists';
import {AnimeService} from '../shared/service/anime.service';
import {Anime} from '../shared/model/anime';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    topLists: Lists[];
    public listArticles: Article[];
    public animeList: Anime[];

    constructor(private route: ActivatedRoute, private articleService: ArticleService, private animeService: AnimeService) {
        this.listArticles = [];
        this.topLists = [];
        this.animeList = [];
    }

    ngOnInit(): void {
        this.fillArraysWithData();
        console.log(this.topLists);
        console.log(this.animeList);
        console.log(this.articleService);
    }

    fillArraysWithData(): void {
        this.articleService.getAllArticles().subscribe(data => this.listArticles = data);
        this.animeService.getAllAnime(1).subscribe(data => this.animeList = data.slice(0, 6));
        this.topLists.push(this.route.snapshot.data.allLists);
    }

    /*  goToAnime($event): void {
          const id = this.route.snapshot.data.animeList[$event].id;
          window.open('/#/animes/' + id + '/', '_self');
      }*/
}
