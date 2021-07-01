import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormControl, FormGroup } from '@angular/forms'
import { UserService } from '../shared/service/user.service'
import { Subscription } from 'rxjs'
import { ToastrService } from 'ngx-toastr'
import { RefreshService } from '../shared/service/refresh.service'

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
	loginForm: FormGroup
	id: Subscription

	constructor(private router: Router, private userService: UserService, private toastr: ToastrService, private refresh: RefreshService) {
		this.loginForm = new FormGroup({
			username: new FormControl(''),
			password: new FormControl(''),
		})
	}

	ngOnInit(): void {}

	onSubmit(): void {
		this.loginUser()
	}

	loginUser(): void {
		this.userService.login(this.loginForm.value).subscribe(
			() => {
				sessionStorage.setItem('isConnected', 'true')
				this.userService.emitAuthStatus(true)
				this.toastr.success('You are successfully logged in', 'Login successful!')
				return this.router.navigate(['account']).then(() => {
					this.refresh.refresh(this.router.url)
				})
			},
			(error) => {
				this.toastr.error('Your username/password is wrong', 'Login failed!')
			}
		)
	}
}
