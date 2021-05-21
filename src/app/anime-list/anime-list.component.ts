import {Component, OnInit} from '@angular/core';
import {Anime} from '../shared/model/anime';
import {ActivatedRoute, Params} from '@angular/router';
import {AnimeService} from '../shared/service/anime.service';
import {document} from 'ngx-bootstrap/utils';

@Component({
    selector: 'app-anime-list',
    templateUrl: './anime-list.component.html',
    styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
    public animeList: Anime[];
    public currentPage: number;
    public numberOfItemPerPage: 20;
    public pages: number;
    public pagesArray: [];
    public activatePagination: boolean;
    private research: string;
    public page: number;
    private queryParams: Params;

    constructor(private route: ActivatedRoute,
                private animeService: AnimeService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(data => {
            this.queryParams = data;
            if (this.queryParams.page) {
                this.currentPage = parseInt(this.queryParams.page, null);
                this.animeService.getAllPagesSearch(this.queryParams.query).subscribe(pages => {
                    this.pages = pages;
                    this.pages = Math.ceil((pages) / 20);
                    this.pagesArray = [].constructor(this.pages);
                    if (this.pages > 1) {
                        this.activatePagination = true;
                    }
                    this.animeService.getAllAnimeByName(this.queryParams.query, this.currentPage).subscribe((animes) => {
                        this.animeList = animes;
                    });
                });
            } else {
                this.route.params.subscribe(params => {
                    this.currentPage = parseInt(params.page, null);
                    this.animeService.getAllPages().subscribe(pages => {
                        this.pages = pages;
                        this.pages = Math.ceil((pages) / 20);
                        this.pagesArray = [].constructor(this.pages);
                        if (this.pages > 1) {
                            this.activatePagination = true;
                        }
                        this.animeService.getAllAnime(this.currentPage).subscribe(data => {
                            this.animeList = data;
                        });
                    });
                });
            }
        });
    }

    changePage(newCurrentPage: number): void {
        this.currentPage = newCurrentPage;
        if (!document.location.href.includes('research')) {
            this.animeService.getAllAnime(this.currentPage).subscribe((data) => {
                this.animeList = data;
            });
        } else {
            this.animeService.getAllAnimeByName(document.location.href.split('research/')[1], this.currentPage).subscribe((data) => {
                this.animeList = data;
            });
        }
    }
}
