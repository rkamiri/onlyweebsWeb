import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../shared/service/article.service';
import {Article} from '../shared/model/article';
import {Image} from '../shared/model/image';
import {Lists} from '../shared/model/lists';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    topLists: Lists[];
    imageObject: Image[];
    public listArticles: Article[];

    constructor(private route: ActivatedRoute, private articleService: ArticleService) {
        this.imageObject = [];
        this.listArticles = [];
        this.topLists = [];
        this.articleService.getAllArticles().subscribe((data) => {
            this.listArticles = data;
            console.log(data[0]);
        });
        for (let i = 0; i < 8; i++) {
            this.imageObject.push({
                id: this.route.snapshot.data.animeList[i].id,
                content: this.route.snapshot.data.animeList[i].cover,
                name: this.route.snapshot.data.animeList[i].internationalTitle
            });
        }
        for (let i = 0; i < 5; i++) {
            this.topLists.push(this.route.snapshot.data.allLists[i]);
        }
    }

    ngOnInit(): void {
        console.log(this.route.snapshot.data.allLists);
        console.log(this.imageObject[0].content);
    }

    goToAnime($event): void {
        const id = this.route.snapshot.data.animeList[$event].id;
        window.open('/#/animes/' + id + '/', '_self');
    }
}
