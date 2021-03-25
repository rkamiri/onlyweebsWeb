import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private authEvent = new BehaviorSubject<boolean>(false);
    constructor(private httpclient: HttpClient) {
    }
    login(value: object): Observable<string> {
        return this.httpclient.post<string>('http://localhost:6671/login', value);
    }
    register(value: object): Observable<any> {
        return this.httpclient.post('http://localhost:6671/register', value);
    }
    getCurrentUser(): Observable<User> {
        return this.httpclient.get<User>('http://localhost:6671/users/current');
    }
    updateCurrentUser(value: object): Observable<User> {
        return this.httpclient.put<User>('http://localhost:6671/users/update', value);
    }
    emitAuthStatus(state: boolean): void{
        this.authEvent.next(state);
    }
    authListener(): Observable<any>{
        this.emitAuthStatus(sessionStorage.getItem('isConnected') === 'true');
        return this.authEvent.asObservable();
    }
    logout(): void {
        this.httpclient.post<any>('http://localhost:6671/logout', '').subscribe(
            () => {
                sessionStorage.setItem('isConnected', 'false');
                this.emitAuthStatus(false);
            }
        );
    }
}
