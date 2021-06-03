import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../shared/service/user.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
    ISpinnerConfig,
    SPINNER_ANIMATIONS,
    SPINNER_PLACEMENT,
} from '@hardpool/ngx-spinner';
import { ImageService } from '../shared/service/image.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
    private newPassWordUser: User;
    public personalInfoForm: FormGroup;
    public bioForm: FormGroup;
    public passwordForm: FormGroup;
    public profilePictureUrl: string;
    public spinner: boolean;
    public spinnerConfig: ISpinnerConfig;
    public currentUser: User;
    public sameIp: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private http: HttpClient,
        private imageService: ImageService
    ) {
        this.personalInfoForm = new FormGroup({
            id: new FormControl(''),
            username: new FormControl(''),
            firstname: new FormControl(''),
            lastname: new FormControl(''),
            email: new FormControl(''),
            bio: new FormControl(''),
        });
        this.bioForm = new FormGroup({
            id: new FormControl(''),
            bio: new FormControl(''),
            username: new FormControl(''),
            firstname: new FormControl(''),
            lastname: new FormControl(''),
            email: new FormControl(''),
        });
        this.passwordForm = new FormGroup({
            id: new FormControl(''),
            username: new FormControl(''),
            oldPassword: new FormControl(''),
            newPasswordA: new FormControl(''),
            newPasswordB: new FormControl(''),
        });
    }

    ngOnInit(): void {
        console.log('hello world!');
        this.sameIp = 'true';
        this.currentUser = this.route.snapshot.data.currentUser;
        this.userService.checkSameIp().subscribe((data) => {
            if (!data) {
                this.sameIp = 'false';
            }
        });
        this.createProfilePictureUrl();
        this.fillForms();
        this.setSpinnerConfig();
    }

    setSpinnerConfig(): void {
        this.spinnerConfig = {
            placement: SPINNER_PLACEMENT.block_window,
            animation: SPINNER_ANIMATIONS.spin_3,
            size: '20rem',
            bgColor: 'rgba(40, 43, 48, 0.6)',
            color: '#097ce7',
        };
        this.spinner = false;
    }

    fillForms(): void {
        this.personalInfoForm.controls.id.setValue(this.currentUser.id);
        this.personalInfoForm.controls.username.setValue(
            this.currentUser.username
        );
        this.personalInfoForm.controls.firstname.setValue(
            this.currentUser.firstname
        );
        this.personalInfoForm.controls.lastname.setValue(
            this.currentUser.lastname
        );
        this.personalInfoForm.controls.email.setValue(this.currentUser.email);
        this.personalInfoForm.controls.bio.setValue(this.currentUser.bio);
        this.bioForm.controls.id.setValue(this.currentUser.id);
        this.bioForm.controls.bio.setValue(this.currentUser.bio);
        this.bioForm.controls.username.setValue(this.currentUser.username);
        this.bioForm.controls.firstname.setValue(this.currentUser.firstname);
        this.bioForm.controls.lastname.setValue(this.currentUser.lastname);
        this.bioForm.controls.email.setValue(this.currentUser.email);
        this.passwordForm.controls.id.setValue(this.currentUser.id);
        this.newPassWordUser = this.currentUser;
    }

    createProfilePictureUrl(): void {
        this.profilePictureUrl =
            environment.backend + '/image/' + this.currentUser.image.id;
    }

    updatePersonalInfos(): void {
        this.userService
            .updateCurrentUser(this.personalInfoForm.value)
            .subscribe((data) => {
                if (data.username !== this.currentUser.username) {
                    this.userService.logout();
                    return this.router.navigate(['login']);
                }
                location.reload();
            });
    }

    updateBio(): void {
        this.userService.updateCurrentUser(this.bioForm.value).subscribe(() => {
            location.reload();
        });
    }

    fileChange(event): void {
        this.showSpinner();
        const fileList: FileList = event.target.files;
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        this.imageService
            .postProfilePicture(formData, this.currentUser.id)
            .subscribe(() => setTimeout(location.reload.bind(location), 1));
    }

    showSpinner(): void {
        this.spinner = true;
    }

    hideSpinner(): void {
        this.spinner = false;
    }

    updateIp(): void {
        this.userService.updateIp().subscribe(() => {
            this.sameIp = 'changed';
        });
    }

    updatePassword(): void {
        this.userService
            .sendMailForPasswordUpdateAnfGenerateToken()
            .subscribe(() => {});
    }

    deleteAccount(): void {
        if (
            confirm('Are you sure you want to permanently delete your account?')
        ) {
            this.userService.deleteUser().subscribe(() => {
                this.userService.logout();
                this.router.navigate(['/home']).then();
            });
        }
    }
}
