import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ReleasesType } from 'src/app/shared/enum/releaseType';
import { Months } from '../../shared/enum/months';

@Component({
    templateUrl: './releases-page.component.html'
})
export class ReleasesPageComponent implements OnInit {

    months: SelectItem[] = Months;

    releaseType: SelectItem[] = ReleasesType;

    mouthSelected: any

    releaseTypeSelected: any

    constructor(
    ) { }

    ngOnInit() {
    }

}
