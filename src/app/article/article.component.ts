import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../shared/service/article.service';
import {Article} from '../shared/model/article';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    data: Article;

    constructor(private articleService: ArticleService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.data = this.route.snapshot.data.article;
    }
}
