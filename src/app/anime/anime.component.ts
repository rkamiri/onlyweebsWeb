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

@Component({
    selector: 'app-anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnDestroy, OnInit {


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
    navigationSubscription;
    comments;
    userHasComment: boolean;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private ratingService: RatingService,
                private listService: ListsService,
                private commentsService: CommentService) {
        this.userHasComment = false;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.initialiseAnime();
                this.commentsService.getCommentsForAnime(this.anime.id).subscribe((comments) => {
                    this.comments = comments;
                    comments.forEach(comment => {
                        if (comment.user.id === +sessionStorage.getItem('userid')) {
                            this.userHasComment = true;
                        }
                    });
                });
            }
        });
        this.rateForm = new FormGroup({
            rate: new FormControl('')
        });
        this.commentForm = new FormGroup({
            comment: new FormControl('')
        });
        this.userHasRated = 'Add Personal Rate';
    }

    ngOnDestroy(): void {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.anime = this.activatedRoute.snapshot.data.anime;
        this.globalRate = this.activatedRoute.snapshot.data.globalRating;
        if (sessionStorage.getItem('isConnected') === 'true') {
            this.listService.getMyCustomLists().subscribe((customLists) => {
                this.userCustomLists = customLists;
                this.hasCustom = customLists.length !== 0;
            });
            this.listService.getMyDefaultLists().subscribe((defaultLists) => {
                this.userDefaultLists = defaultLists;
            });
            this.currentRate = this.activatedRoute.snapshot.data.currentUserRating;
            this.ratingService.getCurrentUserRatingForThisAnime(this.anime.id).subscribe((data) => {
                this.currentRate = data;
            });
            if (this.currentRate === null || this.currentRate === undefined) {
                if (!(this.currentRate === 666)) {
                    this.rateForm.controls.rate.setValue(this.currentRate);
                } else {
                    this.currentRate = undefined;
                }
            }
        }
    }

    initialiseAnime(): void {
        this.anime = this.activatedRoute.snapshot.data.anime;
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

    sendAnimeComment(): void {
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

    deleteAnimeComment(): void {
        if (confirm('Are you sure you want to delete this comment ?')) {
            this.commentsService.deleteAnimeComment(this.anime.id).subscribe(() => {
                location.reload();
            });
        }
    }
}
