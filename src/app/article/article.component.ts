import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ArticleService} from '../shared/service/article.service';
import {Article} from '../shared/model/article';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    public data: Article;
    public articleCoverUrl: string;
    public userImageUrl: string;

    constructor(private articleService: ArticleService, private route: ActivatedRoute) {
        this.data = this.route.snapshot.data.article;
    }

    ngOnInit(): void {
        this.articleCoverUrl = environment.backend + '/image/' + this.data.cover.id;
        this.userImageUrl = environment.backend + '/image/' + this.data.author.image.id;
    }
}

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {
    }

    transform(value): any {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}
