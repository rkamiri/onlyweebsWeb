import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { PasswordUpdate } from '../model/password.update';

@Injectable({ providedIn: 'root' })
export class PasswordUpdateResolver implements Resolve<PasswordUpdate> {
	constructor(private service: UserService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PasswordUpdate> {
		return this.service.sendMailForPasswordUpdateAnfGenerateToken();
	}
}
