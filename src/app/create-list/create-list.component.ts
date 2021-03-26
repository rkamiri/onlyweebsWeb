import { Component, OnInit } from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

@Component({
    selector: 'app-create-list',
    templateUrl: './create-list.component.html',
    styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
    selectedValue: string;
    selectedOption: any;
    states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
        'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
        'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
        'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    newList = [];
    constructor() {
    }

    ngOnInit(): void {
    }

    onSelect(event: TypeaheadMatch): void {
        this.selectedOption = event.item;
        this.newList.push(event.item);
        console.log(event);
    }

    onDelete(event): void {
        const key = event.target.parentElement.id;
        const index = this.newList.indexOf(key, 0);
        this.newList.splice(index, 1);
    }


}




