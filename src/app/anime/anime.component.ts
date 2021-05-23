import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Anime} from '../shared/model/anime';
import {FormControl, FormGroup} from '@angular/forms';
import {RatingService} from '../shared/service/rating.service';
import {Rating} from '../shared/model/rating';
import {CommentService} from '../shared/service/comment.service';
import {Lists} from '../shared/model/lists';
import {IsListedIn} from '../shared/model/is.listed.in';
import {ListsService} from '../shared/service/lists.service';
import {AnimeService} from '../shared/service/anime.service';

@Component({
    selector: 'app-anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnInit {
    public userCustomLists: Lists[];
    public userDefaultLists: Lists[];
    public anime: Anime;
    public currentRate: number;
    public globalRate: number;
    public selectedList: string;
    public isConnected = sessionStorage.getItem('isConnected') === 'true';
    public hasCustom: boolean;
    rateForm: FormGroup;
    commentForm: FormGroup;
    userHasRated: string;
    comments;
    userHasComment: boolean;
    public genres: string[];

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private ratingService: RatingService,
                private listService: ListsService,
                private commentsService: CommentService,
                private animeService: AnimeService) {
        this.userHasComment = false;
        this.rateForm = new FormGroup({rate: new FormControl('')});
        this.commentForm = new FormGroup({comment: new FormControl('')});
        this.userHasRated = 'Add Personal Rate';
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.animeService.getOneAnime(params.id).subscribe(data => {
                    this.anime = data;
                    this.initComments(data.id);
                }
            );
        });
        this.genres = null;
        this.globalRate = this.activatedRoute.snapshot.data.globalRating;
        if (sessionStorage.getItem('isConnected') === 'true') {
            this.listService.getMyCustomLists().subscribe((customLists) => {
                this.userCustomLists = customLists;
                this.hasCustom = customLists.length !== 0;
            });
            this.listService.getMyDefaultLists().subscribe((defaultLists) => {
                this.userDefaultLists = defaultLists;
            });
            if (this.currentRate === null || this.currentRate === undefined) {
                this.currentRate = this.activatedRoute.snapshot.data.currentUserRating;
                if (!(this.currentRate === 666)) {
                    this.rateForm.controls.rate.setValue(this.currentRate);
                } else {
                    this.currentRate = undefined;
                }
            }
        }
    }

    initComments(animeId: number): void {
        this.commentsService.getCommentsForAnime(animeId).subscribe((comments) => {
            this.comments = comments;
            console.log(comments);
            comments.forEach(comment => {
                if (comment.user.id === +sessionStorage.getItem('userid')) {
                    this.userHasComment = true;
                }
            });
        });
    }

    updateRating(): void {
        const rating: Rating = {
            userId: +sessionStorage.getItem('userid'),
            animeId: this.anime.id,
            rate: this.rateForm.controls.rate.value
        };
        this.ratingService.putCurrentUserRatingOfAnAnime(rating).subscribe(() => {
            location.reload();
        });
    }

    validateValue(event: number): void {
        if (event > 10) {
            if (event >= 100 && event < 200) {
                event = Number(event.toString().slice(0, 2));
            } else {
                event = Number(event.toString().slice(0, 1));
            }
            this.rateForm.setValue({rate: event});
        }
        if (event < 0) {
            this.rateForm.setValue({rate: 0});
        }
    }

    sendComment(): void {
        this.commentsService.putCommentForAnime({
            user: null,
            body: this.commentForm.get('comment').value.toString(),
            date: null,
            animeEntity: this.anime
        }).subscribe(() => {
            location.reload();
        });
    }

    addAnimeToList(): void {
        this.listService.getListByUserIdAndName(this.selectedList).subscribe((data) => {
            const ili: IsListedIn = {id: 666, list_id: data.id, anime_id: this.anime.id};
            this.listService.putAnimeInList(ili).subscribe(
                () => {
                    setTimeout(location.reload.bind(location), 1);
                }
            );
        });
    }

    deleteComment(): void {
        if (confirm('Are you sure you want to delete this comment ?')) {
            this.commentsService.deleteCommentForAnime(this.anime.id).subscribe(() => {
                location.reload();
            });
        }
    }
}
