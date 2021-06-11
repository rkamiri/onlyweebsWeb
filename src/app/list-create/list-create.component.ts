import { Component, OnInit } from '@angular/core';
import { Anime } from '../shared/model/anime';
import { Lists } from '../shared/model/lists';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from '../shared/service/lists.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { IsListedIn } from '../shared/model/is.listed.in';
import { AnimeService } from '../shared/service/anime.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-list-create',
    templateUrl: './list-create.component.html',
    styleUrls: ['./list-create.component.css'],
})
export class ListCreateComponent implements OnInit {
    animeList: Anime[];
    thisList: Lists;
    selectedValue: string;
    selectedOption: any;
    newList = [];
    createListForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private listService: ListsService,
        private animeService: AnimeService,
        private toastr: ToastrService
    ) {
        this.createListForm = new FormGroup({
            name: new FormControl(''),
            description: new FormControl(''),
        });
    }

    ngOnInit(): void {
        this.animeService
            .getAllAnimes()
            .subscribe((data) => (this.animeList = data));
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
        if (this.newList.length !== 0) {
            const list: Lists = {
                name: this.createListForm.get('name').value,
                description: this.createListForm.get('description').value,
            };
            this.listService.createList(list).subscribe(() => {
                this.fillList();
                return this.router.navigate(['/lists']);
            });
        } else {
            this.toastr.error(
                'Your list must contain a least one anime.',
                'Empty list !'
            );
        }
    }

    fillList(): void {
        this.thisList = this.route.snapshot.data.lastList;
        for (const i of this.newList) {
            const ili: IsListedIn = {
                list_id: this.thisList.id + 1,
                anime_id: i.id,
            };
            this.listService.putAnimeInList(ili).subscribe(() => {});
        }
    }
}
