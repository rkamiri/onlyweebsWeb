import {Component, OnInit} from '@angular/core';
import {Lists} from '../shared/model/lists';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
    public lists: Lists[];

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.lists = this.route.snapshot.data.allLists;
        console.log(this.lists);
    }


}
