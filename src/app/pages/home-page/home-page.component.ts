import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/shared/local-storage/storage.service';
import { UserService } from 'src/app/service/user/user.service';
import { ReleasesService } from 'src/app/service/releases/releases.service';
import { ReleasesDTO } from '../../service/releases/releases';
import { ReleasesType } from 'src/app/shared/enum/releaseType';

@Component({
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
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
        private releasesService: ReleasesService
    ) {}

     ngOnInit() {
        this.userId = this.storageService.getItem('user')?.id;
        this.userService.getBalance(this.userId).subscribe( data =>  this.balance = data );
        this.releasesService.getLastReleases(this.userId).subscribe( data => this.releases = data);
        this.userService.getExtractByReleaseType(this.userId, ReleasesType.gain).subscribe( data =>  this.extractGains = data );
        this.userService.getExtractByReleaseType(this.userId, ReleasesType.lose).subscribe( data =>  this.extractLoses = data );
     }
}
