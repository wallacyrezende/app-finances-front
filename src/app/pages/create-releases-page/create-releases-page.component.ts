import { Component, OnInit } from '@angular/core';
import { ReleasesType } from '../../shared/enum/releaseType';
import { Months } from '../../shared/enum/months';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReleasesService } from 'src/app/service/releases/releases.service';
import { StorageService } from 'src/app/shared/local-storage/storage.service';

@Component({
    templateUrl: './create-releases-page.component.html'
})
export class CreateReleasesPageComponent implements OnInit {

    mouths = Months;
    releasesType = ReleasesType;
    releaseForm: any;
    userId!: number;

    constructor(
        private formBuilder: FormBuilder,
        private releasesService: ReleasesService,
        private storageService: StorageService,
    ) { this.userId = this.storageService.getItem('user')?.id as number }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.releaseForm = this.formBuilder.group({
            description: ['', Validators.required],
            year: ['', Validators.required],
            value: ['', Validators.required],
            mouth: ['', Validators.required],
            type: ['', Validators.required],
            userId: [this.userId]
        });
    }

    onSubmit() {
        if(this.releaseForm.valid) {
            this.releasesService.createRelease(this.releaseForm.value).subscribe( this.releaseForm.reset());
        }

    }
}
