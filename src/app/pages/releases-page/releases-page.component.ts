import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
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

    first = 0;
    rows = 10;
    totalRecords!: number;
    selectAll: boolean = false;

    userId!: number;
    releases!: ReleasesDTO[];
    selectedReleases!: ReleasesDTO[];
    release!: ReleasesDTO;
    cols!: any[];
    status!: any[];
    submitted!: boolean;
    showEditDialog!: boolean;
    showAlert!: boolean;
    action!: string;
    pageNumberActual!: number;

    constructor( 
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private releasesService: ReleasesService,
        private storageService: StorageService,
        private serviceMsg: MessageService,
    ) {
        this.userId = this.storageService.getItem('user')?.id;
     }

    ngOnInit() {
        this.cols = [
            {field: 'description', header: 'Descrição'},
            {field: 'mouth', header: 'Mês'},
            {field: 'year', header: 'Ano'},
            {field: 'value', header: 'Valor'},
            {field: 'type', header: 'Tipo'},
            {field: 'status', header: 'Status'}
        ];
    }

    loadReleases(event: LazyLoadEvent) {
        this.first = event.first!;
        this.rows = event.rows!;
        this.pageNumberActual = this.first/event.rows!;
        this.getReleases();            
    }

    getReleases() {
        this.releasesService.getReleases(this.userId, this.pageNumberActual, this.rows).subscribe({
            next: (data) => {
                this.releases = data.items;
                this.totalRecords = data.totalRecords;
            },
            error: (e) => {
                this.serviceMsg.add({ key: 'tst', severity: 'error', summary: 'Mensagem', detail: e });
            }
        });
    }

    editRelease(release: ReleasesDTO) {
        this.release = {...release};
        console.log(this.release)
        this.showEditDialog = true;
    }

    showDialog(action: string, release?: ReleasesDTO ) {
        this.release = {...release!};
        this.action = action;
        this.showAlert = true;
    }

    hideDialog() {
        this.showEditDialog = false;
        this.submitted = false;
    }

    saveRelease(release: ReleasesDTO) {
        this.submitted = true;
        if(release.description && release.mouth && release.year && release.value && release.type) {
            this.releasesService.update(release).subscribe({
                next: (data) => { 
                    this.showEditDialog = !data;
                    this.submitted = false;
                    this.getReleases();
                    this.serviceMsg.add({ key: 'tst', severity: 'success', summary: 'Sucesso', detail: "Lançamento atualizado" });
                },
                error: (e) => {
                    this.serviceMsg.add({ key: 'tst', severity: 'error', summary: 'Mensagem', detail: e });
                }
            });
        }
    }

    confirmDeleteSelected(){
        this.showAlert = false;
        this.releases = this.releases.filter(val => !this.selectedReleases.includes(val));
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Lançamentos deletados', life: 3000});
        this.selectedReleases = [];
    }

    confirmEffectiveRelease() {
        this.releasesService.updateStatus(this.release.id, ReleaseStatus.effective).subscribe({
            next: (data) => {
                this.showAlert = !data;
                this.getReleases(); 
                this.serviceMsg.add({ key: 'tst', severity: 'success', summary: 'Sucesso', detail: "Lançamento efetivado" });
            }, 
            error: (e) => {
                this.serviceMsg.add({ key: 'tst', severity: 'error', summary: 'Mensagem', detail: e });
            }
        })
    }

    confirmCancelRelease() { 
        this.releasesService.updateStatus(this.release.id, ReleaseStatus.canceled).subscribe({
            next: (data) => {
                this.showAlert = !data;
                this.getReleases(); 
                this.serviceMsg.add({ key: 'tst', severity: 'success', summary: 'Sucesso', detail: "Lançamento cancelado" });
            }, 
            error: (e) => {
                this.serviceMsg.add({ key: 'tst', severity: 'error', summary: 'Mensagem', detail: e });
            }
        })
    }
}
