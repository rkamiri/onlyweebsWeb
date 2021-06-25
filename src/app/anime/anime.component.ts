import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Anime } from '../shared/model/anime';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RatingService } from '../shared/service/rating.service';
import { Rating } from '../shared/model/rating';
import { CommentService } from '../shared/service/comment.service';
import { Lists } from '../shared/model/lists';
import { IsListedIn } from '../shared/model/is.listed.in';
import { ListsService } from '../shared/service/lists.service';
import { AnimeService } from '../shared/service/anime.service';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../shared/model/user';
import { UserService } from '../shared/service/user.service';

@Component({
    selector: 'app-anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnDestroy, OnInit {
    public userCustomLists: Lists[];
    public userDefaultLists: Lists[];
    public anime: Anime;
    public currentRate: number;
    public globalRate: number;
    public selectedList: string;
    public isConnected;
    public hasCustom: boolean;
    rateForm: FormGroup;
    commentForm: FormGroup;
    userHasRated: string;
    navigationSubscription;
    comments;
    userHasComment: boolean;
    public genres: string[];
    public studios: string[];
    public producers: string[];
    public currentUser: User;
    ctrl = new FormControl(null, Validators.required);

    constructor(
        private router: Router,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private ratingService: RatingService,
        private listService: ListsService,
        private commentsService: CommentService,
        private animeService: AnimeService,
        config: NgbAccordionConfig
    ) {
        this.userHasComment = false;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.initialiseAnime();
            }
        });
        this.rateForm = new FormGroup({
            rate: new FormControl(''),
        });
        this.commentForm = new FormGroup({
            comment: new FormControl(''),
        });
        this.userHasRated = 'Add Personal Rate';

        config.type = 'dark';
        this.globalRate = 0;
    }

    ngOnDestroy(): void {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe((user) => {
            this.currentUser = user;
            this.isConnected = user !== null;
            if (user !== null) {
                this.listService.getMyCustomLists().subscribe((customLists) => {
                    this.userCustomLists = customLists;
                    this.hasCustom = customLists.length !== 0;
                });
                this.listService
                    .getMyDefaultLists()
                    .subscribe((defaultLists) => {
                        this.userDefaultLists = defaultLists;
                    });
                this.ratingService
                    .getCurrentUserRatingForThisAnime(this.anime.id)
                    .subscribe((data) => {
                        this.currentRate = data;
                        if (data === 666) {
                            this.currentRate = undefined;
                        } else {
                            this.rateForm.controls.rate.setValue(data);
                        }
                    });
                this.commentsService
                    .getCommentsForAnime(this.anime.id)
                    .subscribe((comments) => {
                        this.comments = comments;
                        comments.forEach((comment) => {
                            if (comment.user.id === this.currentUser.id) {
                                this.userHasComment = true;
                            }
                        });
                    });
            }
        });
        this.anime = this.activatedRoute.snapshot.data.anime;
        this.ratingService
            .getGlobalRatingOfAnAnime(
                this.activatedRoute.snapshot.data.anime.id
            )
            .subscribe((gRate) => {
                if (isNaN(gRate)) {
                    this.globalRate = 0;
                } else {
                    this.globalRate = gRate;
                }
            });
    }

    initialiseAnime(): void {
        this.anime = this.activatedRoute.snapshot.data.anime;
        this.animeService.getGenres(this.anime.id).subscribe((genres) => {
            this.genres = [];
            genres.forEach((value) => this.genres.push(value.name));
        });
        this.animeService.getProducers(this.anime.id).subscribe((producers) => {
            this.producers = [];
            producers.forEach((value) => this.producers.push(value.name));
        });
        this.animeService.getStudios(this.anime.id).subscribe((studios) => {
            this.studios = [];
            studios.forEach((value) => this.studios.push(value.name));
        });
    }

    updateRating(): void {
        const rating: Rating = {
            userId: this.currentUser.id,
            animeId: this.anime.id,
            rate: this.rateForm.controls.rate.value,
        };
        this.ratingService
            .putCurrentUserRatingOfAnAnime(rating)
            .subscribe(() => {
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
            this.rateForm.setValue({ rate: event });
        }
        if (event < 0) {
            this.rateForm.setValue({ rate: 0 });
        }
    }

    addAnimeToList(): void {
        let notInADefaultList = false;
        this.listService
            .getListByUserIdAndName(this.selectedList)
            .subscribe((list) => {
                if (
                    list.name === 'Watched' ||
                    list.name === 'Currently watching' ||
                    list.name === 'Plan to watch'
                ) {
                    notInADefaultList = this.getAnimesFromAllLists().some(
                        (anime) => anime.id === this.anime.id
                    );
                    if (this.getAnimesFromAllLists().length === 0) {
                        this.addAnimeToListDumb(list);
                    } else {
                        if (notInADefaultList) {
                            this.addAnimeToListDumb(list);
                        } else {
                            this.removeAnimeFromListIfAlreadyIn(
                                list,
                                'Watched'
                            );
                            this.removeAnimeFromListIfAlreadyIn(
                                list,
                                'Currently watching'
                            );
                            this.removeAnimeFromListIfAlreadyIn(
                                list,
                                'Plan to watch'
                            );
                        }
                    }
                } else {
                    this.addAnimeToListDumb(list);
                }
            });
    }

    removeAnimeFromListIfAlreadyIn(list: Lists, listName: string): void {
        this.listService
            .getListByUserIdAndName(listName)
            .subscribe((watched) => {
                this.listService
                    .getOneListContentByID(watched.id)
                    .subscribe((data) => {
                        data.forEach((a) => {
                            if (a.title === this.anime.title) {
                                this.listService
                                    .deleteAnimeInList(
                                        watched.id,
                                        this.anime.id
                                    )
                                    .subscribe();
                            } else {
                                this.addAnimeToListDumb(list);
                            }
                        });
                    });
            });
    }

    addAnimeToListDumb(list: Lists): void {
        const ili: IsListedIn = {
            id: 666,
            list_id: list.id,
            anime_id: this.anime.id,
        };
        this.listService.putAnimeInList(ili).subscribe(() => {
            setTimeout(location.reload.bind(location), 1);
        });
    }

    getAnimesFromAllLists(): Anime[] {
        const animeArray: Anime[] = [];
        this.listService.getMyDefaultLists().subscribe((lists) => {
            lists.forEach((defaultList) => {
                this.listService
                    .getOneListContentByID(defaultList.id)
                    .subscribe((listContent) => {
                        listContent.forEach((anime) => {
                            animeArray.push(anime);
                        });
                    });
            });
        });
        return animeArray;
    }

    sendAnimeComment(): void {
        this.commentsService
            .putComment({
                user: null,
                body: this.commentForm.get('comment').value.toString(),
                date: null,
                animeEntity: this.anime,
            })
            .subscribe(() => {
                location.reload();
            });
    }

    deleteAnimeComment(): void {
        if (confirm('Are you sure you want to delete this comment ?')) {
            this.commentsService
                .deleteAnimeComment(this.anime.id)
                .subscribe(() => {
                    location.reload();
                });
        }
    }
}
