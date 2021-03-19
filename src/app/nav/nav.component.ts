import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../shared/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    isNavbarCollapsed = true;
    authSubscription: Subscription;
    isUserAuthenticated: boolean;
    constructor(  private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.authSubscription = this.userService.authListener().subscribe(state => {
            this.isUserAuthenticated = state;
        });
    }
    logoutUser(): void {
        this.userService.logout();
        this.router.navigate(['home']);
    }
}
