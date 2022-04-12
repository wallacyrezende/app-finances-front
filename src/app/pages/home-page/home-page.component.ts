import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/shared/local-storage/storage.service';
import { UserService } from 'src/app/service/user/user.service';
import { ReleasesService } from 'src/app/service/releases/releases.service';
import { ReleasesDTO } from '../../service/releases/releases';
import { ReleasesType } from 'src/app/shared/enum/releaseType';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    providers: [MessageService]
})
export class HomePageComponent implements OnInit {

    userId!: number;

    releases!: ReleasesDTO[];

    @Input() 
    balance!: number;

    @Input() 
    extractGains!: number;

    @Input() 
    extractLoses!: number;

    constructor(
        private storageService: StorageService,
        private userService: UserService,
        private releasesService: ReleasesService,
        private serviceMsg: MessageService
    ) {}

     ngOnInit() {
        this.userId = this.storageService.getItem('user')?.id;
        this.getBalance();  
        this.getLastReleases()  
        this.getExtractByReleaseType(ReleasesType.gain)
        this.getExtractByReleaseType(ReleasesType.lose);
     }

     getBalance() {
        this.userService.getBalance(this.userId).subscribe({ 
            next: (data) =>  this.balance = data,
            error: () => { this.serviceMsg.add({ key: 'tst', severity: 'error', summary: 'Mensagem', detail: "Erro inesperado" }) } 
        });
     }

     getLastReleases(){
        this.releasesService.getLastReleases(this.userId).subscribe({ 
            next: (data) => this.releases = data,
            error: () => { this.serviceMsg.add({ key: 'tst', severity: 'error', summary: 'Mensagem', detail: "Erro inesperado" }) } 
        });
     }

     getExtractByReleaseType(releaseType: string){
        this.userService.getExtractByReleaseType(this.userId, releaseType).subscribe({ 
            next: (data) => {
                if(releaseType === ReleasesType.gain)
                    this.extractGains = data;
                else
                    this.extractLoses = data;
            },
            error: () => { this.serviceMsg.add({ key: 'tst', severity: 'error', summary: 'Mensagem', detail: "Erro inesperado" }) } 
        });
     }
}
