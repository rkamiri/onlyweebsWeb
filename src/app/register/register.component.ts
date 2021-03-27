import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../shared/service/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(private router: Router, private userService: UserService) {
        this.registerForm = new FormGroup({
            username: new FormControl(''),
            password: new FormControl(''),
            firstname: new FormControl(''),
            lastname: new FormControl(''),
            email: new FormControl(''),
            gender: new FormControl('')
        });
    }

    ngOnInit(): void {
        console.log(navigator.language);
    }

    onSubmit(): void {
        this.registerUser();
    }

    registerUser(): void {
        this.userService.register(this.registerForm.value).subscribe(
            () => {
                return this.router.navigate(['home']);
            } ,
            (error) => {
                error.log(error);
                return;
            }
        );
    }
}
