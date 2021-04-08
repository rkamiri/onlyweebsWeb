import {Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Lists} from '../shared/model/lists';
import {Anime} from '../shared/model/anime';
import {ActivatedRoute} from '@angular/router';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead/typeahead-match.class';
import {ListsService} from '../shared/service/lists.service';
import {IsListedIn} from '../shared/model/is.listed.in';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-onelist',
    templateUrl: './one-list.component.html',
    styleUrls: ['./one-list.component.css']
})

export class OneListComponent implements OnInit {
    public listInfo: Lists;
    public animeList: Anime[];
    public fullAnimeList: Anime[];
    public newList: Anime[];
    selectedValue: string;
    selectedOption: any;
    addAnimeForm: FormGroup;

    constructor(private modalService: NgbModal,
                private route: ActivatedRoute,
                private listService: ListsService) {
        this.addAnimeForm = new FormGroup({});
    }

    ngOnInit(): void {
        this.listInfo = this.route.snapshot.data.list;
        this.animeList = this.route.snapshot.data.listContent;
        this.fullAnimeList = this.route.snapshot.data.getAnimeList;
        this.newList = [];
    }

    onSelect(event: TypeaheadMatch): void {
        this.selectedOption = event.item;
        this.newList.push(event.item);
    }

    onSubmit(): void {
        this.addAnime();
    }

    private addAnime(): void {
        const ili: IsListedIn = {id: 666, list_id: this.listInfo.id, anime_id: this.newList.pop().id};
        this.listService.putAnimeInList(ili).subscribe(
            () => {
                setTimeout(location.reload.bind(location), 1);
            }
        );
    }

    onDelete(animeId: number): void {
        this.listService.deleteAnimeInList(this.listInfo.id, animeId).subscribe(
            () => {
                setTimeout(location.reload.bind(location), 1);
            }
        );
    }
}

/*open(content: any): void {
       this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
           this.closeResult = `Closed with: ${result}`;
       }, (reason) => {
           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
       });
   }

   private getDismissReason(reason: any): string {
       if (reason === ModalDismissReasons.ESC) {
           return 'by pressing ESC';
       } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
           return 'by clicking on a backdrop';
       } else {
           return `with: ${reason}`;
       }
   }*/
