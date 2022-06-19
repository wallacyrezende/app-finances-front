import { Component, OnInit } from '@angular/core';
import { releasesType } from '../../shared/enum/releaseType';
import { Months } from '../../shared/enum/months';
import { FormBuilder, Validators } from '@angular/forms';
import { ReleasesService } from 'src/app/service/releases/releases.service';
import { StorageService } from 'src/app/shared/local-storage/storage.service';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
    templateUrl: './create-releases-page.component.html',
    styleUrls: ['./create-releases-page.component.scss'],
    providers: [MessageService]
})
export class CreateReleasesPageComponent implements OnInit {

    mouths: SelectItem[] = Months;
    releasesType: SelectItem[] = releasesType;
    releaseForm: any;
    userId!: number;
    isLoading = false;

    constructor(
        private formBuilder: FormBuilder,
        private releasesService: ReleasesService,
        private storageService: StorageService,
        private serviceMsg: MessageService
    ) { 
        this.userId = this.storageService.getItem('user')?.id; 
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.releaseForm = this.formBuilder.group({
            description: [null, Validators.required],
            value: [null, Validators.required],
            type: [null, Validators.required],
            releaseDate:[null, Validators.required],
            userId: [this.userId]
        });
    }

    onSubmit() {
        if(this.releaseForm.valid) {
            this.isLoading = true;
            this.releasesService.createRelease(this.releaseForm.value).subscribe({
                next: () => { 
                    this.serviceMsg.add({ key: 'tst', severity: 'success', summary: 'Sucesso', detail: "Lançamento salvo" });
                    this.releaseForm.reset();
                },
                error: (e) => { 
                    this.serviceMsg.add({ key: 'tst', severity: 'error', summary: 'Mensagem', detail: e });
                    this.isLoading = false; 
                },
                complete: () => { this.isLoading = false; }
            });
        } else {
            this.serviceMsg.add({ key: 'tst', severity: 'warn', summary: 'Alerta', detail: "Existem campos vazios ou inválidos" });
        }

    }
}
