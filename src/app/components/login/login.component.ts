import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../service/app.config.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import {
    SocialAuthService,
    FacebookLoginProvider,
    SocialUser,
} from 'angularx-social-login';
import { User, UserDTO } from 'src/app/service/user/User';
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

    
    @Input()
    formDTO = {
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
        private serviceMsgError: MessageService,
        public authService: AuthService
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

    loginWithFacebook(): void {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    login() {
        this.userDTO = {
            email: this.formDTO.email,
            password: this.formDTO.password
        }

        this.authService.authLogin(this.userDTO).subscribe({
            next: (data) => {
                this.isLoggedin = data != null;
                this.addStorages(data as User);
                this.router.navigate(['/home']);
            }, 
            error: (e) => {
                this.serviceMsgError.add({ key: 'tst', severity: 'error', summary: 'Mensagem', detail: e });
            }
        });
    }

    signOut(): void {
        this.socialAuthService.signOut();
    }

    addStorages(data: any) {
        this.storageService.setItem('isLoggedin', this.isLoggedin);
        this.storageService.setItem('user', data);
    }
}
