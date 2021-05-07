import {Component, OnInit} from '@angular/core';
import {Lists} from '../shared/model/lists';
import {ActivatedRoute} from '@angular/router';
import {ListsService} from '../shared/service/lists.service';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
    public lists: Lists[];
    public  listsImages: [[]];

    constructor(private route: ActivatedRoute, private listService: ListsService) {}

    ngOnInit(): void {
        this.lists = this.route.snapshot.data.customLists;
        this.listService.getImageOfListCustom().subscribe(data => {
                console.log(data);
                this.listsImages = data;
            }
        );
    }
}
