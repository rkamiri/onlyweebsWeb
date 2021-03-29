import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Anime} from '../shared/model/anime';

@Component({
    selector: 'app-anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnDestroy {
    public anime: Anime;

    navigationSubscription;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        // subscribe to the router events - storing the subscription so
        // we can unsubscribe later.
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                this.initialiseAnime();
            }
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
    }
}
