import { Component, OnInit } from '@angular/core';
import { Anime } from '../shared/model/anime';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AnimeService } from '../shared/service/anime.service';
import { document } from 'ngx-bootstrap/utils';
import { Genres } from '../shared/model/genres';
import { Studios } from '../shared/model/studios';
import { Producers } from '../shared/model/producers';

@Component({
    selector: 'app-anime-list',
    templateUrl: './anime-list.component.html',
    styleUrls: ['./anime-list.component.css'],
})
export class AnimeListComponent implements OnInit {
    public animeList: Anime[];
    public currentPage: number;
    public pages: number;
    public pagesArray: [];
    public activatePagination: boolean;
    private research: string;
    public page: number;
    public queryParams: Params;
    public listGenres: Genres[];
    public listStudios: Studios[];
    public listProducers: Producers[];
    public selectedGenre: Genres;
    public selectedStudio: Studios;
    public selectedProducer: Producers;

    constructor(
        private route: ActivatedRoute,
        private animeService: AnimeService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initPage();
        this.animeService
            .getAllGenres()
            .subscribe((data) => (this.listGenres = data));
        this.animeService
            .getAllStudios()
            .subscribe((data) => (this.listStudios = data));
        this.animeService
            .getAllProducers()
            .subscribe((data) => (this.listProducers = data));
    }

    initPage(): void {
        this.route.queryParams.subscribe((data) => {
            this.queryParams = data;
            /*
                 genre: this.selectedGenre
                        ? this.selectedGenre.id
                        : null,
                     studio : this.selectedStudio
                        ? this.selectedStudio.id
                        : null,
                     producer : this.selectedProducer
                        ? this.selectedProducer.id
                        : null,
                    page: 1,
            */

            console.log(this.queryParams);
            if (this.queryParams.page) {
                this.currentPage = parseInt(this.queryParams.page, null);

                if (
                    this.queryParams.genre ||
                    this.queryParams.studio ||
                    this.queryParams.producer
                ) {
                    this.animeService
                        .getAllPagesByAdvancedSearch(
                            this.queryParams.genre,
                            this.queryParams.studio,
                            this.queryParams.producer
                        )
                        .subscribe((pages) => {
                            this.pages = pages;
                            this.pages = Math.ceil(pages / 20);
                            this.pagesArray = [].constructor(this.pages);
                            if (this.pages > 1) {
                                this.activatePagination = true;
                            }

                            this.animeService
                                .getAllAnimesByAdvancedResearch(
                                    this.queryParams.genre,
                                    this.queryParams.studio,
                                    this.queryParams.producer,
                                    this.currentPage
                                )
                                .subscribe((animes) => {
                                    this.animeList = animes;
                                });
                        });
                } else {
                    this.animeService
                        .getAllPagesSearch(this.queryParams.query)
                        .subscribe((pages) => {
                            this.pages = pages;
                            this.pages = Math.ceil(pages / 20);
                            this.pagesArray = [].constructor(this.pages);
                            if (this.pages > 1) {
                                this.activatePagination = true;
                            }
                            this.animeService
                                .getAllAnimeByName(
                                    this.queryParams.query,
                                    this.currentPage
                                )
                                .subscribe((animes) => {
                                    this.animeList = animes;
                                });
                        });
                }
            } else {
                this.route.params.subscribe((params) => {
                    this.currentPage = parseInt(params.page, null);
                    this.animeService.getAllPages().subscribe((pages) => {
                        this.pages = pages;
                        this.pages = Math.ceil(pages / 20);
                        this.pagesArray = [].constructor(this.pages);
                        if (this.pages > 1) {
                            this.activatePagination = true;
                        }
                        this.animeService
                            .getAnimesByPage(this.currentPage)
                            .subscribe((animes) => {
                                this.animeList = animes;
                            });
                    });
                });
            }
        });
    }

    changePage(newCurrentPage: number): void {
        this.currentPage = newCurrentPage;
        if (!document.location.href.includes('research')) {
            this.animeService
                .getAnimesByPage(this.currentPage)
                .subscribe((data) => {
                    this.animeList = data;
                });
        } else {
            this.animeService
                .getAllAnimeByName(
                    document.location.href.split('research/')[1],
                    this.currentPage
                )
                .subscribe((data) => {
                    this.animeList = data;
                });
        }
    }

    searchWithParams(): void {
        this.router
            .navigate(['research/pagination/'], {
                queryParams: {
                    genre: this.selectedGenre ? this.selectedGenre.id : null,
                    studio: this.selectedStudio ? this.selectedStudio.id : null,
                    producer: this.selectedProducer
                        ? this.selectedProducer.id
                        : null,
                    page: 1,
                },
            })
            .then();
    }

    changeGenre($event: Genres, selectedDropDown: string): void {
        switch (selectedDropDown) {
            case 'genre':
                this.selectedGenre = $event;
                break;
            case 'studio':
                this.selectedStudio = $event;
                break;
            case 'producer':
                this.selectedProducer = $event;
                break;
        }
    }
}
