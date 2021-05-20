import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Anime} from '../shared/model/anime';
import {Article} from '../shared/model/article';
import {ArticleService} from '../shared/service/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    toplists = [];
    imageObject = [];
    public listArticles = [];
    constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

    ngOnInit(): void {
        for (let i = 0; i < 8; i++) {
            this.imageObject.push({thumbImage: this.route.snapshot.data.animeList[i].cover,
                title : this.route.snapshot.data.animeList[i].internationalTitle});
        }

        for (let i = 0; i < 5; i++) {
            this.toplists.push(this.route.snapshot.data.allLists[i]);
        }
        this.articleService.getAllArticles().subscribe((data) => {
            console.log(data);
            this.listArticles = data;
        });
        console.log(this.listArticles);
    }

    goToAnime($event): void {
        const id = this.route.snapshot.data.animeList[$event].id;
        window.open('/#/animes/' + id + '/', '_self');
    }
}
