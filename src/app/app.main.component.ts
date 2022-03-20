import { Component, AfterViewInit, OnDestroy, Renderer2, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppComponent } from './app.component';
import { ConfigService } from './service/app.config.service';
import { AppConfig } from './api/appconfig';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html',
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMainComponent implements OnDestroy, OnInit {

    public menuInactiveDesktop!: boolean;

    public menuActiveMobile!: boolean;

    public overlayMenuActive!: boolean;

    public staticMenuInactive: boolean = false;

    public topMenuActive!: boolean;

    public topMenuLeaving!: boolean;

    documentClickListener!: () => void;

    topMenuButtonClick!: boolean;

    config!: AppConfig;

    subscription!: Subscription;

    constructor(public app: AppComponent, public configService: ConfigService) { }

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => this.config = config);
    }


    toggleTopMenu(event: Event) {
        this.topMenuButtonClick = true;
        this.menuActiveMobile = false;

        if (this.topMenuActive) {
            this.hideTopMenu();
        } else {
            this.topMenuActive = true;
        }

        event.preventDefault();
    }

    hideTopMenu() {
        this.topMenuLeaving = true;
        setTimeout(() => {
            this.topMenuActive = false;
            this.topMenuLeaving = false;
        }, 1);
    }


    isStatic() {
        return this.app.menuMode === 'static';
    }

    isDesktop() {
        return window.innerWidth > 992;
    }

    isMobile(){
        return window.innerWidth < 1024;
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }


        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
