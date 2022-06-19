import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../service/app.config.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/auth/token-storage.service';
import {
    SocialAuthService,
    FacebookLoginProvider,
    SocialUser,
} from 'angularx-social-login';
import { UserDTO } from 'src/app/service/user/User';
import { StorageService } from 'src/app/shared/local-storage/storage.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService],
    
})

export class LoginComponent implements OnInit {
    isLoggedin?: boolean = undefined;
    loginForm!: FormGroup;
    socialUser!: SocialUser;
    userDTO!: UserDTO;
    isLoading: boolean = false;

    
    @Input()
    form = {
        email: '',
        password: '',
        rememberMe: false
    }

    constructor(
        public configService: ConfigService,
        private formBuilder: FormBuilder,
        private socialAuthService: SocialAuthService,
        private router: Router,
        private storageService: StorageService,
        private serviceMsg: MessageService,
        public authService: AuthService,
        private tokenStorage: TokenStorageService
    ) { }

    ngOnInit(): void {

        const userLogged = this.storageService.getItem('user');

        if(userLogged) {
            userLogged as UserDTO
            this.userDTO = { ...userLogged };
        }

        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
            this.isLoggedin = user != null;
        });
    }

    // loginWithFacebook(): void {
    //     this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    // }

    login() {
        this.isLoading = true;
        this.authService.login(this.form.email, this.form.password).subscribe({
            next: (data) => {
                this.isLoggedin = data != null;
                this.addStorages(data);
                this.router.navigate(['home']);
            }, 
            error: (e) => {
                this.serviceMsg.add({ key: 'tst', severity: 'error', summary: 'Mensagem', detail: e.error_description });
                this.isLoading = false;
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    // signOut(): void {
    //     this.socialAuthService.signOut();
    // }

    private addStorages(data: any) {
        this.storageService.setItem('isLoggedin', this.isLoggedin);
        this.storageService.setItem('user', 1);
        this.tokenStorage.saveToken(data.access_token);
    }
}
