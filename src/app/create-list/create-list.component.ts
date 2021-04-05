import { Component, OnInit } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import {Anime} from '../shared/model/anime';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Lists} from '../shared/model/lists';
import {ListsService} from '../shared/service/lists.service';
import {UserService} from '../shared/service/user.service';
import {Rating} from '../shared/model/rating';
import {IsListedIn} from '../shared/model/is.listed.in';

@Component({
    selector: 'app-create-list',
    templateUrl: './create-list.component.html',
    styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
    animeList: Anime[];
    thisList: Lists;
    selectedValue: string;
    selectedOption: any;
    newList = [];
    createListForm: FormGroup;

    constructor(private route: ActivatedRoute, private router: Router, private listService: ListsService) {
        this.createListForm = new FormGroup({
            name: new FormControl(''),
            description: new FormControl('')
        });
    }

    ngOnInit(): void {
        this.animeList = this.route.snapshot.data.getAnimeList;
    }

    onSelect(event: TypeaheadMatch): void {
        this.selectedOption = event.item;
        this.newList.push(event.item);
    }

    onDelete(event): void {
        const key = event.target.parentElement.id;
        const index = this.newList.indexOf(key, 0);
        this.newList.splice(index, 1);
    }

    onSubmit(): void {
        this.createList();
    }

    createList(): void {
        this.listService.createList(this.createListForm.value).subscribe(
            () => {
                this.fillList();
                return this.router.navigate(['/lists']);
            }
        );
    }

    fillList(): void {
        this.thisList = this.route.snapshot.data.lastList;
        for (const i of this.newList) {
            const ili: IsListedIn = {id: 666, list_id: this.thisList.id + 1, anime_id: i.id};
            this.listService.putAnimeInList(ili).subscribe(
                () => {}
            );
        }
    }
}




