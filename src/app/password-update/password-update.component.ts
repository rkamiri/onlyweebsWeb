import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {PasswordUpdate} from '../shared/model/password.update';

@Component({
    selector: 'app-password-update',
    templateUrl: './password-update.component.html',
    styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {
    private token: string;
    public updatePasswordForm: FormGroup;
    public notSamePassword: boolean;

    constructor(private userService: UserService, private actRoute: ActivatedRoute, private router: Router) {
        this.updatePasswordForm = new FormGroup({
            newPassword: new FormControl(''),
            confirmPassword: new FormControl('')
        });
    }

    ngOnInit(): void {
        this.actRoute.params.subscribe(params => {
            this.token = params.token;
        });
        this.notSamePassword = false;
    }

    onSubmit(): void {
        if (this.checkSamePassword()) {
            this.updatePassword();
        } else {
            this.notSamePassword = true;
        }
    }

    checkSamePassword(): boolean {
        const newP = this.updatePasswordForm.get('newPassword').value;
        const confirmP = this.updatePasswordForm.get('confirmPassword').value;
        return newP === confirmP && newP !== '' && confirmP !== '';
    }

    private updatePassword(): void {
        const passwordUpdate: PasswordUpdate = {
            token: this.token,
            newPassword: this.updatePasswordForm.get('newPassword').value
        };
        console.log(passwordUpdate);
        this.userService.postUpdatePasswordAction(passwordUpdate).subscribe((response) => {
            console.log(response.status);
            console.log(response.body);
            if (response.status === 200) {
                this.userService.logout();
                this.router.navigate(['/login']).then();
            }
        });
    }
}
