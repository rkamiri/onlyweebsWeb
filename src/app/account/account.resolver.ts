import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../shared/model/user';
import {UserService} from '../shared/service/user.service';

@Injectable({providedIn: 'root'})
export class AccountResolver implements Resolve<User> {
    constructor(private service: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
        return this.service.getCurrentUser();
    }
}
