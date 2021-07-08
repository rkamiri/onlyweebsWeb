import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-custom-error',
	templateUrl: './not-found-error.component.html',
	styleUrls: ['../error.component.sass'],
})
export class NotFoundErrorComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
