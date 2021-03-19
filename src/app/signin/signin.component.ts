import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../shared/service/user.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
    loginForm: FormGroup;
    id: Subscription;

    constructor(private router: Router, private userService: UserService) {
        this.loginForm = new FormGroup({
            username: new FormControl(''),
            password: new FormControl('')
        });
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        console.warn(this.loginForm.value);
        this.loginUser();
    }

    loginUser(): void {
        this.userService.login(this.loginForm.value).subscribe(
            () => {
                sessionStorage.setItem('isConnected', 'true');
                this.userService.emitAuthStatus(true);
                return this.router.navigate(['account']);
            },
            (error) => {
                return error;
            }
        );
    }
}
