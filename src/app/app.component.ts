import {Component} from '@angular/core';
import {UserService} from './shared/service/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'onlyWeebs';

    constructor(private userService: UserService) {
        this.userService.emitAuthStatus(false);
    }
}
