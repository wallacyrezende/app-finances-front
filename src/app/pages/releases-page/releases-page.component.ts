import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    templateUrl: './releases-page.component.html'
})
export class ReleasesPageComponent implements OnInit {

    months!: SelectItem[];

    releaseType!: SelectItem[];

    mouthSelected: any

    releaseTypeSelected: any

    constructor(
    ) { }

    ngOnInit() {
        this.months = [
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 },
        ];

        this.releaseType = [
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' },
        ]
    }

}