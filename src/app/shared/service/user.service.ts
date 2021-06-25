import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../../environments/environment';
import { PasswordUpdate } from '../model/password.update';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private authEvent = new BehaviorSubject<boolean>(false);

    constructor(private httpclient: HttpClient) {}

    login(value: object): Observable<string> {
        return this.httpclient.post<string>(
            environment.backend + '/login',
            value
        );
    }

    register(value: object): Observable<any> {
        return this.httpclient.post(environment.backend + '/register', value);
    }

    getCurrentUser(): Observable<User> {
        const user = this.httpclient.get<User>(
            environment.backend + '/users/current'
        );
        user.subscribe((us) => {
            if (us != null) {
                sessionStorage.setItem('userid', String(us.id));
            }
        });
        return user;
    }

    updateCurrentUser(value: object): Observable<User> {
        return this.httpclient.put<User>(
            environment.backend + '/users/update',
            value
        );
    }

    emitAuthStatus(state: boolean): void {
        this.authEvent.next(state);
    }

    authListener(): Observable<any> {
        let isConnected = false;
        this.getCurrentUser().subscribe((user) => {
            if (user && user.id) {
                isConnected = true;
            }
            this.emitAuthStatus(isConnected);
        });
        return this.authEvent.asObservable();
    }

    logout(): void {
        this.httpclient
            .post<any>(environment.backend + '/logout', '')
            .subscribe(() => {
                sessionStorage.setItem('isConnected', 'false');
                sessionStorage.removeItem('userid');
                this.emitAuthStatus(false);
            });
    }

    checkSameIp(): Observable<boolean> {
        return this.httpclient.get<boolean>(
            environment.backend + '/users/same-ip'
        );
    }

    updateIp(): Observable<any> {
        return this.httpclient.get<any>(
            environment.backend + '/users/update/ip'
        );
    }

    sendMailForPasswordUpdateAnfGenerateToken(): Observable<string> {
        return this.httpclient.get<string>(
            environment.backend + '/security/change-password'
        );
    }

    postUpdatePasswordAction(newPassword: PasswordUpdate): Observable<any> {
        return this.httpclient.post<any>(
            environment.backend + '/security/change-password',
            newPassword,
            {
                observe: 'response',
                headers: new HttpHeaders({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
            }
        );
    }

    deleteUser(): any {
        return this.httpclient.delete<any>(
            environment.backend + '/users/delete'
        );
    }

    getCurrentUserRole(): Observable<any> {
        return this.httpclient.get<any>(environment.backend + '/users/role');
    }
}
