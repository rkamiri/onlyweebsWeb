import { Component, OnInit } from '@angular/core';
import {Anime} from '../shared/model/anime';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
    public animeList: Anime[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.animeList = this.route.snapshot.data.animeList;
      console.log(this.animeList);
  }
}
