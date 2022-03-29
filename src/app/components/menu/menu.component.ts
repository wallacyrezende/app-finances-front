import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { StorageService } from '../../shared/local-storage/storage.service';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
})

export class MenuComponent implements OnInit {

    items!: MenuItem[];

    menuItems!: MenuItem[];

    tieredItems!: MenuItem[];

    constructor(
        private router: Router,
        private storageService: StorageService
    ) {}

    ngOnInit() {

        this.tieredItems = [
            {
                label: 'Início',
                icon: 'pi pi-fw pi-home',
                routerLink: 'home',
            },
            {
                label: 'Lançamentos',
                icon: 'pi pi-fw pi-shopping-cart',
                items: [
                    {
                        label: 'Novo',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: 'create-releases',
                    },
                    {
                        label: 'Consultar',
                        icon: 'pi pi-fw pi-search',
                        routerLink: 'releases',
                    }
                ]
            },
            {
                label: 'Usuários',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Novo',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: 'create-users',
                    },
                    {
                        label: 'Editar',
                        icon: 'pi pi-fw pi-user-edit'
                    }
                ]
            },
            { separator: true },
            {
                label: 'Sair',
                icon: 'pi pi-fw pi-sign-out',
                command: () => { this.logout() },
            }
        ];


        this.menuItems = [
            {
                label: 'Save', icon: 'pi pi-fw pi-check'
            },
            {
                label: 'Update', icon: 'pi pi-fw pi-refresh'
            },
            {
                label: 'Delete', icon: 'pi pi-fw pi-trash'
            },
            {
                separator: true
            },
            {
                label: 'Home', icon: 'pi pi-fw pi-home'
            },
        ];
    }

    logout() {
        this.storageService.removeItem('isLoggedin');
        this.router.navigate(['login']);
    }

}
