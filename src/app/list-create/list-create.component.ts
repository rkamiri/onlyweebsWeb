import {Component, OnInit} from '@angular/core';
import {Anime} from '../shared/model/anime';
import {Lists} from '../shared/model/lists';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ListsService} from '../shared/service/lists.service';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead/typeahead-match.class';
import {IsListedIn} from '../shared/model/is.listed.in';

@Component({
    selector: 'app-list-create',
    templateUrl: './list-create.component.html',
    styleUrls: ['./list-create.component.css']
})
export class ListCreateComponent implements OnInit {
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
        const list: Lists = {
            id: 666,
            name: this.createListForm.get('name').value,
            creationDate: 'string',
            description: this.createListForm.get('description').value,
            isOwnedBy: null
        };
        this.listService.createList(list).subscribe(
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
                () => {
                }
            );
        }
    }
}
