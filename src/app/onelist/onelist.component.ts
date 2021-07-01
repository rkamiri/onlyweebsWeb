import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Lists } from '../shared/model/lists';
import { AnimeDto } from '../shared/model/anime';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { ListsService } from '../shared/service/lists.service';
import { IsListedIn } from '../shared/model/is.listed.in';
import { FormControl, FormGroup } from '@angular/forms';
import { AnimeService } from '../shared/service/anime.service';
import { UserService } from '../shared/service/user.service';
import { CommentService } from '../shared/service/comment.service';
import { Comment } from '../shared/model/comment';

@Component({
    selector: 'app-onelist',
    templateUrl: './onelist.component.html',
    styleUrls: ['./onelist.component.css'],
})
export class OnelistComponent implements OnInit {
    private closeResult: string;
    public listInfo: Lists;
    public animesOfThisList: AnimeDto[];
    public allAnimes: AnimeDto[];
    public animesThatWillBeAdded: AnimeDto[];
    public selectedValue: string;
    public selectedOption: any;
    public addAnimeForm: FormGroup;
    public index: number;
    public owned: boolean;
    public isDefault: boolean;
    public isConnected;
    public userHasComment;
    private navigationSubscription;
    public comments: Comment[];
    public commentForm: FormGroup;
    public adminStatus: string;

    constructor(
        private modalService: NgbModal,
        private route: ActivatedRoute,
        private listService: ListsService,
        private userService: UserService,
        private commentService: CommentService,
        private router: Router,
        private animeService: AnimeService
    ) {
        this.userHasComment = false;
        this.addAnimeForm = new FormGroup({});
        this.closeResult = '';
        this.index = 0;
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.userService.getCurrentUser().subscribe((user) => {
                    this.isConnected = user !== null;
                    this.commentService
                        .getCommentsForLists(this.listInfo.id)
                        .subscribe((comments) => {
                            this.comments = comments;
                            if (user !== null) {
                                comments.forEach((comment) => {
                                    if (comment.user.id === user.id) {
                                        this.userHasComment = true;
                                    }
                                });
                            }
                        });
                });
            }
        });
        this.commentForm = new FormGroup({
            comment: new FormControl(''),
        });
    }

    ngOnInit(): void {
        this.userService
            .getCurrentUserRole()
            .subscribe((data) => (this.adminStatus = data.auth));
        this.listInfo = this.route.snapshot.data.list;
        this.isDefault =
            this.listInfo.name === 'Watched' ||
            this.listInfo.name === 'Currently watching' ||
            this.listInfo.name === 'Plan to watch';
        this.owned =
            +sessionStorage.getItem('userid') === this.listInfo.isOwnedBy.id;
        this.animesOfThisList = this.route.snapshot.data.listContent;
        this.animeService
            .getAllAnimes()
            .subscribe((data) => (this.allAnimes = data));
        this.animesThatWillBeAdded = [];
    }

    onSelect(event: TypeaheadMatch): void {
        this.selectedOption = event.item;
        this.animesThatWillBeAdded.push(event.item);
    }

    onSubmit(): void {
        this.addAnime();
    }

    private addAnime(): void {
        const ili: IsListedIn = {
            id: 666,
            list_id: this.listInfo.id,
            anime_id: this.animesThatWillBeAdded.pop().id,
        };
        this.listService.putAnimeInList(ili).subscribe(() => {
            setTimeout(location.reload.bind(location), 1);
        });
    }

    onDelete(animeId: number): void {
        this.listService
            .deleteAnimeInList(this.listInfo.id, animeId)
            .subscribe(() => {
                setTimeout(location.reload.bind(location), 1);
            });
    }

    open(content: any): void {
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then(
                (result) => {
                    this.closeResult = `Closed with: ${result}`;
                },
                (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(
                        reason
                    )}`;
                }
            );
    }

    getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    deleteList(): void {
        if (confirm('Are you sure you want to delete this custom list ?')) {
            this.listService.deleteList(this.listInfo.id).subscribe(() => {
                this.router.navigate(['/lists']).then();
            });
        }
    }

    sendListComment(): void {
        this.commentService
            .putComment({
                body: this.commentForm.get('comment').value.toString(),
                listsEntity: this.listInfo,
            })
            .subscribe(() => {
                location.reload();
            });
    }

    deleteListComment(userId: number): void {
        if (confirm('Are you sure you want to delete this comment ?')) {
            this.commentService
                .deleteListComment(this.listInfo.id, userId)
                .subscribe(() => {
                    location.reload();
                });
        }
    }
}
