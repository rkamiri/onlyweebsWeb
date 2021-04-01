import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Anime} from '../shared/model/anime';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../shared/model/user';
import {RatingService} from '../shared/service/rating.service';
import {Rating} from '../shared/model/rating';

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
    isUserAuthenticated: boolean;
    navigationSubscription;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private ratingService: RatingService) {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.initialiseAnime();
            }
        });
        this.rateForm = new FormGroup({
            rate: new FormControl('')
        });
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
        this.globalRate = this.activatedRoute.snapshot.data.globalRating.toFixed(1);
        this.isUserAuthenticated = !!this.currentUser;

        if (this.isUserAuthenticated) {
            if (!(this.currentRate == null)) {
                this.currentRate = this.activatedRoute.snapshot.data.currentUserRating;
                if (!(this.currentRate === 666)) {
                    this.rateForm.controls.rate.setValue(this.currentRate);
                }
            }
        }
    }

    updateRating(): void {
        const rating: Rating = {userId: this.currentUser.id, animeId: this.anime.id, rate: this.rateForm.controls.rate.value};
        console.log(rating);
        this.ratingService.putCurrentUserRatingOfAnAnime(rating).subscribe(
            () => { location.reload(); });
    }
}
