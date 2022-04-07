import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ReleaseStatus, releasesType } from 'src/app/shared/enum/releaseType';
import { Months } from '../../shared/enum/months';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReleasesService } from 'src/app/service/releases/releases.service';
import { StorageService } from 'src/app/shared/local-storage/storage.service';
import { ReleasesDTO } from 'src/app/service/releases/releases';

@Component({
    templateUrl: './releases-page.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss', './releases-page.component.scss']
})
export class ReleasesPageComponent implements OnInit {

    months: SelectItem[] = Months;

    releaseType: SelectItem[] = releasesType;

    mouthSelected: any

    releaseTypeSelected: any

    userId!: number;
    releases!: ReleasesDTO[];
    selectedReleases!: ReleasesDTO[];
    release!: ReleasesDTO;
    cols!: any[];
    status!: any[];
    submitted!: boolean;
    releaseDialog!: boolean;
    deleteReleasesDialog!: boolean;
    deleteReleaseDialog!: boolean;
    effectiveDialog!: boolean;

    constructor( 
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private releasesService: ReleasesService,
        private storageService: StorageService,
        private serviceMsgError: MessageService,
    ) {
        this.userId = this.storageService.getItem('user')?.id;
     }

    ngOnInit() {
        this.releasesService.getLastReleases(this.userId).subscribe( data => this.releases = data);
    
        this.cols = [
            {field: 'description', header: 'Descrição'},
            {field: 'mouth', header: 'Mês'},
            {field: 'year', header: 'Ano'},
            {field: 'value', header: 'Valor'},
            {field: 'type', header: 'Tipo'},
            {field: 'status', header: 'Status'}
        ];

        this.status = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
    }

    openNew() {
        this.release = {id: 0,
            description: '',
            mouth: 0,
            year: 0,
            value: 0,
            userId: 0,
            type: '',
            status: ''};
        this.submitted = false;
        this.releaseDialog = true;
    }

    deleteSelectedReleases() {
        this.deleteReleasesDialog = true;
    }

    editRelease(release: ReleasesDTO) {
        this.release = {...release};
        this.releaseDialog = true;
    }

    deleteRelease(release: ReleasesDTO) {
        this.deleteReleaseDialog = true;
        this.release = {...release};
    }

    effectiveRelease(release: ReleasesDTO) {
        this.release = {...release};
        this.effectiveDialog = true;
    }

    confirmDeleteSelected(){
        this.deleteReleasesDialog = false;
        this.releases = this.releases.filter(val => !this.selectedReleases.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedReleases = [];
    }

    confirmDelete(){
        this.deleteReleaseDialog = false;
        this.releases = this.releases.filter(val => val.id !== this.release.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Release Deleted', life: 3000});
        this.release = {id: 0,
            description: '',
            mouth: 0,
            year: 0,
            value: 0,
            userId: 0,
            type: '',
            status: ''};
    }

    hideDialog() {
        this.releaseDialog = false;
        this.submitted = false;
    }

    saveRelease() {
        this.submitted = true;
    }

    confirmEffectiveRelease() {
        this.releasesService.updateStatus(this.release.id, ReleaseStatus.effective).subscribe({
            next: (data) => {
                this.effectiveDialog = !(data != null);
                this.releasesService.getLastReleases(this.userId).subscribe( data => this.releases = data);
            }, 
            error: (e) => {
                this.serviceMsgError.add({ key: 'tst', severity: 'error', summary: 'Mensagem', detail: e });
            }
        })
    }

}
