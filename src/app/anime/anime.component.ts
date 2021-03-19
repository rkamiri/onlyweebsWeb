import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Anime} from '../shared/model/anime';

@Component({
    selector: 'app-anime',
    templateUrl: './anime.component.html',
    styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnInit {
    public anime: Anime;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.anime = this.route.snapshot.data.anime;
    }
}
