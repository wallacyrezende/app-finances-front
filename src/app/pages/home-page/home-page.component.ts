import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/local-storage/storage.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

    userId!: number;

    @Input() 
    public balance!: number;

    constructor(
        private storageService: StorageService,
        private router: Router,
        private userService: UserService,
    ) {
        const isLoggedin = this.storageService.getItem('isLoggedin');
        if(!isLoggedin) {
            this.router.navigate(['/login']);
        } else {
            const user = this.storageService.getItem('userLogged');
            this.userId = user?.id;
        }
     }

     ngOnInit() {
        this.userService.getBalance(this.userId).subscribe( balance =>  this.balance = balance );
     }
}
