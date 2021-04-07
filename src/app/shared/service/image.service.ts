import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Image} from '../model/image';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor(private httpclient: HttpClient) {}

    getProfilePicture(id): Observable<Image> {
        return this.httpclient.get<Image>(environment.backend + '/users/profilepicture/' + id, httpOptions);
    }

    getImage(id): Observable<Image> {
        return this.httpclient.get<Image>(environment.backend + '/upload/image/' + id, httpOptions);
    }
}
