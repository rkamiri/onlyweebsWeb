import {Component, OnInit} from '@angular/core';
import {Anime} from '../shared/model/anime';
import {ActivatedRoute} from '@angular/router';
import {AnimeService} from '../shared/service/anime.service';

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

    constructor(private route: ActivatedRoute,
                private animeService: AnimeService) {
    }

    ngOnInit(): void {
        this.currentPage = 1;
        this.animeList = this.route.snapshot.data.animeList;
        this.animeService.getAllPages().subscribe((data) => {
            this.pages = data;
            this.pages = Math.ceil( (data) / 20);
            console.log(Math.ceil(this.pages));
            this.pagesArray = [].constructor(this.pages);
        });
    }

    changePage(newCurrentPage: number): void {
        this.currentPage = newCurrentPage;
        this.animeService.getAllAnime(this.currentPage).subscribe((data) => {
            this.animeList = data;
        });
    }
}
