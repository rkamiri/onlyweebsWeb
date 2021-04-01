import { Component, OnInit } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import {Anime} from '../shared/model/anime';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Lists} from '../shared/model/lists';
import {ListsService} from '../shared/service/lists.service';
import {UserService} from '../shared/service/user.service';

@Component({
    selector: 'app-create-list',
    templateUrl: './create-list.component.html',
    styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
    animeList: Anime[];
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
        console.log(this.animeList);
    }

    onSelect(event: TypeaheadMatch): void {
        this.selectedOption = event.item;
        this.newList.push(event.item);
        console.log(this.newList);
    }

    onDelete(event): void {
        const key = event.target.parentElement.id;
        console.log(key);
        const index = this.newList.indexOf(key, 0);
        this.newList.splice(index, 1);
        console.log(this.newList);
    }

    onSubmit(): void {
        this.createList();
    }

    createList(): void {
        this.listService.createList(this.createListForm.value).subscribe(
            () => {
                return this.router.navigate(['lists']);
            } ,
            (error) => {
                return;
            }
        );
    }


}




