import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeListDisplayComponent } from './anime-list-display.component';

describe('AnimeListDisplayComponent', () => {
	let component: AnimeListDisplayComponent;
	let fixture: ComponentFixture<AnimeListDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AnimeListDisplayComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AnimeListDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
