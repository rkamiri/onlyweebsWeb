import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { User } from '../shared/model/user';

@Component({
	selector: 'app-admin-users',
	templateUrl: './admin-users.component.html',
	styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
	public users: Array<User>;
	public profilePictureUrl = environment.backend + '/image/';
	public searchInputValue: string;

	constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {
		this.users = this.activatedRoute.snapshot.data.users;
	}

	searchItems(userId: number): void {
		if (userId) {
			this.router.navigate(['user/', userId]).then();
		} else {
			switch (this.users.length) {
				case 0: {
					this.router.navigate(['admin-users']).then();
					break;
				}
				case 1: {
					this.searchInputValue = '';
					this.router.navigate(['user/', this.users[0].id]).then();
					break;
				}
				default: {
					this.router
						.navigate(['animes/research'], {
							queryParams: {
								query: this.searchInputValue,
								page: 1,
							},
						})
						.then();
					break;
				}
			}
		}
	}

	onSearchItemSelected(result: NgbTypeaheadSelectItemEvent<User>): void {
		this.searchItems(result.item.id);
	}

	onSearchSubmit(): void {
		this.searchItems(null);
	}
}
