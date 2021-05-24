import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ArticleService} from '../shared/service/article.service';
import {Article} from '../shared/model/article';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../environments/environment';
import {CommentService} from '../shared/service/comment.service';
import {Comment} from '../shared/model/comment';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    public isConnected = sessionStorage.getItem('isConnected') === 'true';
    public article: Article;
    public articleCoverUrl: string;
    public userImageUrl: string;
    public comments: Comment[];
    public userHasComment: boolean;
    public commentForm: FormGroup;

    constructor(private articleService: ArticleService, private commentsService: CommentService, private route: ActivatedRoute) {
        this.article = this.route.snapshot.data.article;
        this.commentForm = new FormGroup({comment: new FormControl('')});
    }

    ngOnInit(): void {
        this.articleCoverUrl = environment.backend + '/image/' + this.article.cover.id;
        this.userImageUrl = environment.backend + '/image/' + this.article.author.image.id;
        this.initArticleComments();
    }

    initArticleComments(): void {
        this.commentsService.getCommentsForArticle(this.article.id).subscribe((comments) => {
            this.comments = comments;
            comments.forEach(comment => {
                if (comment.user.id === +sessionStorage.getItem('userid')) {
                    this.userHasComment = true;
                }
            });
        });
    }

    sendArticleComment(): void {
        const comment: Comment = {body: this.commentForm.get('comment').value.toString(), articleEntity: this.article};
        this.commentsService.putCommentForAnime(comment).subscribe(() => {
            console.log(comment);
            location.reload();
        });
    }


    deleteArticleComment(): void {
        if (confirm('Are you sure you want to delete this comment ?')) {
            this.commentsService.deleteArticleComment(this.article.id).subscribe(() => {
                location.reload();
            });
        }
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
