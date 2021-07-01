import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ImageDto } from '../model/image';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
const headers = new HttpHeaders({ Accept: 'application/json' });
const options = { headers };

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    constructor(private httpclient: HttpClient) {}

    postProfilePicture(
        formData: FormData,
        userId: number
    ): Observable<ImageDto> {
        return this.httpclient.post<ImageDto>(
            environment.backend + '/image/user-image/' + userId,
            formData,
            options
        );
    }

    postArticleImage(formData): Observable<any> {
        return this.httpclient.post<number>(
            environment.backend + '/image/article-image/',
            formData,
            options
        );
    }
}
