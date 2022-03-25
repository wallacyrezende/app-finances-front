import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../service/app.config.service';
import {
    SocialAuthService,
    FacebookLoginProvider,
    SocialUser,
} from 'angularx-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    socialUser!: SocialUser;
    isLoggedin?: boolean = undefined;

    valCheck: string[] = ['remember'];
    password: string = '';

    constructor(
        public configService: ConfigService,
        private formBuilder: FormBuilder,
        private socialAuthService: SocialAuthService
    ) { console.log(this.isLoggedin) }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
            this.isLoggedin = user != null;
        });
    }
    loginWithFacebook(): void {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
    signOut(): void {
        this.socialAuthService.signOut();
    }

}
