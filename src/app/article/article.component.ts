import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ArticleService } from '../shared/service/article.service';
import { Article } from '../shared/model/article';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { CommentService } from '../shared/service/comment.service';
import { Comment } from '../shared/model/comment';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../shared/service/user.service';
import { RefreshService } from '../shared/service/refresh.service';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
	public isConnected = sessionStorage.getItem('isConnected') === 'true';
	public article: Article;
	public comments: Comment[];
	public userHasComment: boolean;
	public commentForm: FormGroup;
	public similarArticles: Article[];
	public imagePath: string;
	public pageUrl: string;
	adminStatus: string;

	constructor(
		private articleService: ArticleService,
		private commentsService: CommentService,
		private userService: UserService,
		public route: ActivatedRoute,
		public router: Router,
		private refreshService: RefreshService
	) {
		this.commentForm = new FormGroup({ comment: new FormControl('') });
	}

	ngOnInit(): void {
		this.userService.getCurrentUserRole().subscribe((data) => (this.adminStatus = data.auth));
		this.route.params.subscribe(() => {
			this.article = this.route.snapshot.data.article;
			this.articleService.getSimilarArticles(this.article.id, this.article.category.id).subscribe((articles) => {
				this.similarArticles = articles;
			});
		});
		this.pageUrl = window.location.href.replace('#', '%23');
		this.imagePath = environment.backend + '/image/';
		this.initArticleComments();
	}

	initArticleComments(): void {
		this.commentsService.getCommentsForArticle(this.article.id).subscribe((comments) => {
			this.comments = comments;
			comments.forEach((comment) => {
				if (comment.user.id === +sessionStorage.getItem('userid')) {
					this.userHasComment = true;
				}
			});
		});
	}

	sendArticleComment(): void {
		const comment: Comment = {
			body: this.commentForm.get('comment').value.toString(),
			articleEntity: this.article,
		};
		this.commentsService.putComment(comment).subscribe(() => this.refreshService.refresh(this.router.url));
	}

	deleteArticleComment(userId: number): void {
		if (confirm('Are you sure you want to delete this comment ?')) {
			this.commentsService.deleteArticleComment(this.article.id, userId).subscribe(() => this.refreshService.refresh(this.router.url));
		}
	}

	share(website: string): void {
		let url = '';
		switch (website) {
			case 'facebook':
				url = 'http://www.facebook.com/sharer/sharer.php?u=' + this.pageUrl + '&t=onlyweebs';
				break;
			case 'twitter':
				url = 'https://twitter.com/intent/tweet?url=' + this.article.title + ' ' + this.pageUrl + '&hashtags=onlyweebs';
				break;
		}
		window.open(url, 'example', 'width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
	}

	deleteArticle(): void {
		if (confirm('Are you sure you want to delete this article ?')) {
			this.articleService.deleteArticle(this.article.id).subscribe(() => this.router.navigate(['/articles']));
		}
	}
}

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
	constructor(private sanitized: DomSanitizer) {}

	transform(value): any {
		return this.sanitized.bypassSecurityTrustHtml(value);
	}
}
