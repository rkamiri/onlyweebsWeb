import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../shared/service/article.service';
import {Article} from '../shared/model/article';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    data: Article;

    constructor(private articleService: ArticleService) {
    }

    ngOnInit(): void {
        this.articleService.getAllArticles().subscribe((data) => {
            this.data = {
                id: data[0].id,
                title: data[0].title,
                body: data[0].body,
                created_at: data[0].created_at,
                author: data[0].author,
                cover: data[0].cover,
            };
        });
    }

}
