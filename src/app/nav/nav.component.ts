import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../shared/service/user.service';
import {Router} from '@angular/router';
import {SearchService} from '../shared/service/search.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    isNavbarCollapsed = true;
    authSubscription: Subscription;
    isUserAuthenticated: boolean;
    constructor(  private router: Router, private userService: UserService, private searchService: SearchService) { }

    ngOnInit(): void {
        this.authSubscription = this.userService.authListener().subscribe(state => {
            this.isUserAuthenticated = state;
        });
    }
    logoutUser(): void {
        this.userService.logout();
        this.router.navigate(['home']);
    }

/*    onSearchChange($event: Event) {
        this.searchService.search($event);
    }*/
}
