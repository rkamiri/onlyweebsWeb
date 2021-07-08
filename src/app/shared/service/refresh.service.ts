import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class RefreshService {
	constructor(private router: Router) {}
	refresh(url: string): void {
		this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
			this.router.navigate([url]);
		});
	}
}
