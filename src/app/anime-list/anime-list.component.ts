import {Component, OnInit} from '@angular/core';
import {Anime} from '../shared/model/anime';
import {ActivatedRoute} from '@angular/router';
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

    constructor(private route: ActivatedRoute,
                private animeService: AnimeService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.research = params.research;
            if (this.research){
                this.animeService.getAllAnimeByName(this.research, 1).subscribe((data) => {
                    this.animeList = data;
                });
            }
        });
        this.currentPage = 1;
        if (!document.location.href.includes('research')) {
            this.animeService.getAllPages().subscribe((data) => {
                this.pages = data;
                this.pagesArray = [].constructor(this.pages);
            });
            if (!this.research){
                this.animeList = this.route.snapshot.data.animeList;
            }
            this.activatePagination = true;
        } else {
            this.animeService.getAllPagesSearch(document.location.href.split('research/')[1]).subscribe((data) => {
                this.pages = data;
                this.pages = Math.ceil((data) / 20);
                this.pagesArray = [].constructor(this.pages);
                if (this.pages > 1){
                    this.activatePagination = true;
                }
            });
        }
    }

    changePage(newCurrentPage: number): void {
        this.currentPage = newCurrentPage;
        if (!document.location.href.includes('research')) {
            this.animeService.getAllAnime(this.currentPage).subscribe((data) => {
                this.animeList = data;
            });
        }
        else{
            this.animeService.getAllAnimeByName(document.location.href.split('research/')[1], this.currentPage).subscribe((data) => {
                this.animeList = data;
            });
        }
    }
}
