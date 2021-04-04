import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Image} from '../model/image';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor(private httpclient: HttpClient) {}

    getImageById(id): Observable<Image> {
        return this.httpclient.get<Image>(environment.backend + '/upload/image/' + id);
    }
}
