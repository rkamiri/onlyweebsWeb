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
        return this.httpclient.post(environment.backend + '/register', value);
    }
    getCurrentUser(): Observable<User> {
        const user = this.httpclient.get<User>( environment.backend + '/users/current');
        user.subscribe((us) => {
            sessionStorage.setItem('userid', String(us.id));
        });
        return user;
    }
    updateCurrentUser(value: object): Observable<User> {
        return this.httpclient.put<User>( environment.backend + '/users/update', value);
    }
    emitAuthStatus(state: boolean): void{
        this.authEvent.next(state);
    }
    authListener(): Observable<any>{
        let isConnected = false;
        this.getCurrentUser().subscribe(
            (n) => {
                if (n){
                    if (n.id){
                        isConnected = true;
                    }
                }
                this.emitAuthStatus(isConnected);
            },
            (error) => {
                this.emitAuthStatus(isConnected);
            }
        );
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
