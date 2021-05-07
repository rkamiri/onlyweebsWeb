import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ArticleService} from '../shared/service/article.service';
import {Article} from '../shared/model/article';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from "@angular/platform-browser";

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

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
    constructor(private sanitized: DomSanitizer) {}
    transform(value): any {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}
