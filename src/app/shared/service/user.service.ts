import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private authEvent = new BehaviorSubject<boolean>(false);
    constructor(private httpclient: HttpClient) {
    }
    login(value: object): Observable<string> {
        return this.httpclient.post<string>(environment.backend + '/login', value);
    }
    register(value: object): Observable<any> {
        return this.httpclient.post( '/register', value);
    }
    getCurrentUser(): Observable<User> {
        return this.httpclient.get<User>( environment.backend + '/users/current');
    }
    updateCurrentUser(value: object): Observable<User> {
        return this.httpclient.put<User>( environment.backend + '/users/update', value);
    }
    emitAuthStatus(state: boolean): void{
        this.authEvent.next(state);
    }
    authListener(): Observable<any>{
        this.emitAuthStatus(sessionStorage.getItem('isConnected') === 'true');
        return this.authEvent.asObservable();
    }
    logout(): void {
        this.httpclient.post<any>( environment.backend + '/logout', '').subscribe(
            () => {
                sessionStorage.setItem('isConnected', 'false');
                this.emitAuthStatus(false);
            }
        );
    }
}
