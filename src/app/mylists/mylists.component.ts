import {Component, OnInit} from '@angular/core';
import {Lists} from '../shared/model/lists';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-mylists',
    templateUrl: './mylists.component.html',
    styleUrls: ['./mylists.component.css']
})
export class MylistsComponent implements OnInit {
    public lists: Lists[];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.lists = this.route.snapshot.data.myLists;
    }

}
