import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../service/app.config.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import {
    SocialAuthService,
    FacebookLoginProvider,
    SocialUser,
} from 'angularx-social-login';
import { UserDTO } from 'src/app/shared/user/User';
import { StorageService } from 'src/app/shared/local-storage/storage.service';

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
    @Input()
    public email?: string;

    @Input()
    public password?: string;

    constructor(
        public configService: ConfigService,
        private formBuilder: FormBuilder,
        private socialAuthService: SocialAuthService,
        private userService: UserService,
        private router: Router,
        private storageService: StorageService,
    ) { }

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

    login() {
        const userDTO = new UserDTO();
        userDTO.email = this.email;
        userDTO.password = this.password;
        this.userService.authUser(userDTO).subscribe((data) => {
            this.isLoggedin = data != null;
            this.storageService.setItem('isLoggedin', this.isLoggedin);
            this.storageService.setItem('userLogged', data);
            this.router.navigate(['/home']);
        });
    }

    signOut(): void {
        this.socialAuthService.signOut();
    }

}
