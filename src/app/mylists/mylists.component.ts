import {Component, OnInit} from '@angular/core';
import {Lists} from '../shared/model/lists';
import {ListsService} from '../shared/service/lists.service';

@Component({
    selector: 'app-mylists',
    templateUrl: './mylists.component.html',
    styleUrls: ['./mylists.component.css']
})
export class MylistsComponent implements OnInit {
    public defaultLists: Lists[];
    public customLists: Lists[];

    constructor(private listService: ListsService) {
    }

    ngOnInit(): void {
        this.fillArrayWithData();
    }

    fillArrayWithData(): void {
        this.listService.getMyCustomLists().subscribe(customLists => this.customLists = customLists);
        this.listService.getMyDefaultLists().subscribe(defaultLists => this.defaultLists = defaultLists);
    }

    delete(id: number): void {
        if (confirm('Are you sure you want to delete this custom list ?')) {
            this.listService.deleteList(id).subscribe(() => location.reload());
        }
    }
}
