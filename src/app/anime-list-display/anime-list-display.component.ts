import { Component, Input, OnInit } from '@angular/core';
import { Lists } from '../shared/model/lists';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../shared/service/lists.service';
import { UserService } from '../shared/service/user.service';
import { User } from '../shared/model/user';

@Component({
    selector: 'app-anime-list-display',
    templateUrl: './anime-list-display.component.html',
    styleUrls: ['./anime-list-display.component.css'],
})
export class AnimeListDisplayComponent implements OnInit {
    @Input()
    lists: Lists[];
    @Input()
    isDefault: string;
    @Input()
    userId: number;
    listsImages: [[]];
    connectedUser: User;

    constructor(
        private route: ActivatedRoute,
        private listService: ListsService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userService
            .getCurrentUser()
            .subscribe((data) => (this.connectedUser = data));
        if (this.userId) {
            console.log('ttt');
            this.listService
                .getImagesOfUserCustomListByUserId(this.userId)
                .subscribe((data) => {
                    console.log(data);
                    this.listsImages = data;
                });
        } else if (this.isDefault === 'user_default') {
            this.listService
                .getImagesOfUserDefaultList()
                .subscribe((data) => (this.listsImages = data));
        } else if (this.isDefault === 'user_custom') {
            this.listService
                .getImagesOfUserCustomList()
                .subscribe((data) => (this.listsImages = data));
        } else {
            this.listService
                .getImagesOfCustomLists()
                .subscribe((data) => (this.listsImages = data));
        }
    }

    delete(id: number): void {
        if (confirm('Are you sure you want to delete this custom list ?')) {
            this.listService.deleteList(id).subscribe(() => location.reload());
        }
    }
}
