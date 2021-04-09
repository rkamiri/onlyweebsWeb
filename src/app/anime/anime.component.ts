import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Anime} from '../shared/model/anime';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/model/user';
import {RatingService} from '../shared/service/rating.service';
import {Rating} from '../shared/model/rating';
import {CommentService} from "../shared/service/comment.service";

@Component({
    selector: 'app-anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnDestroy, OnInit {
    public currentUser: User;
    public anime: Anime;
    public currentRate: number;
    public globalRate: number;
    rateForm: FormGroup;
    commentForm: FormGroup;
    isUserAuthenticated: boolean;
    userHasRated: string;
    navigationSubscription;
    comments;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private ratingService: RatingService,
                private commentsService: CommentService) {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.initialiseAnime();
                this.commentsService.getCommentsForAnime(this.anime.id).subscribe((comments) => {
                    this.comments = comments;
                    console.log(this.comments);
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

    initialiseAnime() {
        this.anime = this.activatedRoute.snapshot.data.anime;
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.anime = this.activatedRoute.snapshot.data.anime;
        this.currentUser = this.activatedRoute.snapshot.data.currentUser;
        this.globalRate = this.activatedRoute.snapshot.data.globalRating;
        this.isUserAuthenticated = !!this.currentUser;

        if (this.isUserAuthenticated) {
            if (this.currentRate === null || this.currentRate === undefined) {
                this.currentRate = this.activatedRoute.snapshot.data.currentUserRating;
                if (!(this.currentRate === 666)) {
                    this.rateForm.controls.rate.setValue(this.currentRate);
                }
                else{
                    this.currentRate = undefined;
                }
            }
        }
    }

    updateRating(): void {
        const rating: Rating = {userId: this.currentUser.id, animeId: this.anime.id, rate: this.rateForm.controls.rate.value};
        this.ratingService.putCurrentUserRatingOfAnAnime(rating).subscribe(() => { location.reload(); });
    }

    validateValue(event: number): void {
        if (event > 10) {
            if (event >= 100 && event < 200) {
                event = Number(event.toString().slice(0, 2));
            }
            else { event = Number(event.toString().slice(0, 1)); }
            this.rateForm.setValue({rate: event});
        }
        if (event < 0) {
            this.rateForm.setValue({rate: 0});
        }
    }

    sendComment(): void {
        this.commentsService.putCommentForAnime({animeId: this.anime.id, userId: 19,
            comment: this.commentForm.get('comment').value.toString()}).subscribe((n) => {
                location.reload();
        });
    }
}
