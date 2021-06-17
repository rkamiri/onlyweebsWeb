import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../shared/service/user.service';
import { Router } from '@angular/router';
import { SearchService } from '../shared/service/search.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SearchResult } from '../shared/model/searchResult';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
    isNavbarCollapsed = true;
    authSubscription: Subscription;
    isUserAuthenticated: boolean;
    searchInputValue: string;
    adminStatus: string;
    searchArray: Array<SearchResult>;
    username: string;
    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            switchMap((term: string) => {
                const searchArray = this.searchService.search(term);
                searchArray.subscribe((result) => {
                    this.searchArray = result;
                });
                return term === '' ? [] : searchArray;
            })
        );
    formatter = (x: SearchResult) => x.title;

    constructor(
        private router: Router,
        private userService: UserService,
        private searchService: SearchService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.userService.getCurrentUserRole().subscribe((data) => {
            this.adminStatus = data.auth;
        });
        this.authSubscription = this.userService
            .authListener()
            .subscribe((state) => {
                this.isUserAuthenticated = state;
                this.userService.getCurrentUser().subscribe((user) => {
                    if (user != null) {
                        this.username = user.username;
                    }
                });
            });
        this.searchArray = [];
    }

    logoutUser(): void {
        this.userService.logout();
        this.router.navigate(['home']).then(() => {
            setTimeout(() => {
                window.location.reload();
            }, 500);
        });
        this.toastr.success('You are logged out', 'Logout successful!');
    }

    searchItems(animeId: number): void {
        if (animeId) {
            this.router.navigate(['animes/', animeId]).then();
        } else {
            switch (this.searchArray.length) {
                case 0: {
                    this.router.navigate(['animes/page/1']).then();
                    break;
                }
                case 1: {
                    this.searchInputValue = '';
                    this.router
                        .navigate(['animes/', this.searchArray[0].id])
                        .then();
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

    onSearchItemSelected(
        result: NgbTypeaheadSelectItemEvent<SearchResult>
    ): void {
        this.searchItems(result.item.id);
    }

    onSearchSubmit(): void {
        this.searchItems(null);
    }
}
