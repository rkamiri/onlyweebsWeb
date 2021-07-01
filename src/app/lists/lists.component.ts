import { Component, OnInit } from '@angular/core'
import { Lists } from '../shared/model/lists'
import { ActivatedRoute } from '@angular/router'
import { ListsService } from '../shared/service/lists.service'
import { UserService } from '../shared/service/user.service'
import { User } from '../shared/model/user'

@Component({
	selector: 'app-lists',
	templateUrl: './lists.component.html',
	styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
	public lists: Lists[]
	public listsImages: [[]]
	public currentUser: User

	constructor(private route: ActivatedRoute, private listService: ListsService, private userService: UserService) {}

	ngOnInit(): void {
		this.userService.getCurrentUser().subscribe((data) => (this.currentUser = data))
		this.lists = this.route.snapshot.data.customLists
		this.listService.getImagesOfCustomLists().subscribe((data) => (this.listsImages = data))
	}
}
