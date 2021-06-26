import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeStats } from '../shared/model/anime.stats';
import { AverageStats } from '../shared/model/average.stats';
import { GeneralStats } from '../shared/model/general.stats';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
    public generalStats: GeneralStats;
    public animeStats: AnimeStats[];
    public averageStats: AverageStats;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.generalStats = this.activatedRoute.snapshot.data.generalStats;
        this.animeStats = this.activatedRoute.snapshot.data.animeStats;
        this.averageStats = this.activatedRoute.snapshot.data.averageStats;
    }
}
