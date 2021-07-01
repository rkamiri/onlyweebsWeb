import { Component, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { UserService } from '../shared/service/user.service'
import { Router } from '@angular/router'
import { SearchService } from '../shared/service/search.service'
import { debounceTime, switchMap } from 'rxjs/operators'
import { SearchResult } from '../shared/model/searchResult'
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr'
import { environment } from 'src/environments/environment'
import { RefreshService } from '../shared/service/refresh.service'

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
	public isNavbarCollapsed = true
	public authSubscription: Subscription
	public userIsAuthenticated: boolean
	public searchInputValue: string
	public searchArray: Array<SearchResult>
	public username: string
	public showMenu: boolean = false
	public logoUrl = environment.backend + '/image/logo'
	search = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			switchMap((term: string) => {
				const searchArray = this.searchService.search(term)
				searchArray.subscribe((result) => {
					this.searchArray = result
				})
				return term === '' ? [] : searchArray
			})
		)
	formatter = (x: SearchResult) => x.title

	constructor(
		private router: Router,
		private userService: UserService,
		private searchService: SearchService,
		private toastr: ToastrService,
		private refreshService: RefreshService
	) {}

	ngOnInit(): void {
		this.authSubscription = this.userService.authListener().subscribe(() => {
			this.userService.getCurrentUser().subscribe((user) => {
				this.userIsAuthenticated = user != null
				if (user != null) this.username = user.username
			})
		})
		this.searchArray = []
	}

	logoutUser(): void {
		this.userService.logout()
		this.router.navigate(['home']).then(() => {
			this.refreshService.refresh(this.router.url)
		})
		this.toastr.success('You are logged out', 'Logout successful!')
	}

	searchItems(animeId: number): void {
		if (animeId) {
			this.router.navigate(['animes/', animeId]).then()
		} else {
			switch (this.searchArray.length) {
				case 0: {
					this.router.navigate(['animes/page/1']).then()
					break
				}
				case 1: {
					this.searchInputValue = ''
					this.router.navigate(['animes/', this.searchArray[0].id]).then()
					break
				}
				default: {
					this.router
						.navigate(['animes/research'], {
							queryParams: {
								query: this.searchInputValue,
								page: 1,
							},
						})
						.then()
					break
				}
			}
		}
	}

	onSearchItemSelected(result: NgbTypeaheadSelectItemEvent<SearchResult>): void {
		this.searchItems(result.item.id)
	}

	onSearchSubmit(): void {
		this.searchItems(null)
	}
}
