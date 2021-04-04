import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ImageService} from '../service/image.service';
import {Image} from '../model/image';

@Injectable({providedIn: 'root'})
export class ImageResolver implements Resolve<Image> {
    constructor(private service: ImageService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Image> | Promise<Image> | Image {
        return this.service.getImageById(route.paramMap.get('id'));
    }
}
