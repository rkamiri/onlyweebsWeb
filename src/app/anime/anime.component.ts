import {Component, OnDestroy} from '@angular/core';
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
    constructor( private router: Router, private activatedRoute: ActivatedRoute, private ratingService: RatingService ) {
        // subscribe to the router events - storing the subscription so
        // we can unsubscribe later.
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                this.initialiseAnime();
            }
        });
        this.rateForm = new FormGroup({
            rate: new FormControl('')
        });
    }

    initialiseAnime() {
        // Set default values and re-fetch any data you need.
        this.anime = this.activatedRoute.snapshot.data.anime;
    }
    ngOnDestroy() {
        // avoid memory leaks here by cleaning up after ourselves. If we
        // don't then we will continue to run our initialiseInvites()
        // method on every navigationEnd event.
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    ngOnInit(): void {
        this.anime = this.route.snapshot.data.anime;
        this.globalRate = this.route.snapshot.data.globalRating;
        this.isUserAuthenticated = sessionStorage.getItem('isConnected') === 'true';
        if (this.isUserAuthenticated) {
            this.currentUser = this.route.snapshot.data.currentUser;
            this.currentRate = this.route.snapshot.data.currentUserRating;
            if (!(this.currentRate == null)) {
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
            (n) => {
                console.log(n);
            }, (error => {
                console.log(error);
            })
        );
    }
}
