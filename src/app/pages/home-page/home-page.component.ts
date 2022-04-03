import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/shared/local-storage/storage.service';
import { UserService } from 'src/app/service/user/user.service';
import { ReleasesService } from 'src/app/service/releases/releases.service';
import { ReleasesDTO } from '../../service/releases/releases';

@Component({
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

    userId!: number;

    releases!: ReleasesDTO[];

    @Input() 
    public balance!: number;

    constructor(
        private storageService: StorageService,
        private userService: UserService,
        private releasesService: ReleasesService
    ) {}

     ngOnInit() {
        this.userId = this.storageService.getItem('user')?.id;
        this.userService.getBalance(this.userId).subscribe( balance =>  this.balance = balance );
        this.releasesService.getLastReleases(this.userId).subscribe( releases => this.releases = releases);
     }
}
