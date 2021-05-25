import {Component, OnInit} from '@angular/core';
import {UserService} from './shared/service/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'onlyWeebs';
    showFooter = false;

    constructor(private userService: UserService) {
        this.userService.emitAuthStatus(false);
    }

    ngOnInit(): void {
        this.setTimeOutForFooter();
    }

    setTimeOutForFooter(): void {
        setTimeout(() => this.showFooter = true, 100);
    }
}
