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
import { UserDTO } from 'src/app/service/user/User';
import { StorageService } from 'src/app/shared/local-storage/storage.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService],
    
})

export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    socialUser!: SocialUser;
    isLoggedin?: boolean = undefined;
    userDTO!: UserDTO;

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
        private serviceMsgError: MessageService,
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
        this.userDTO = {
            email: this.email,
            password: this.password
        }
        this.userService.authUser(this.userDTO).subscribe({
            next: (data) => {
                this.isLoggedin = data != null;
                this.storageService.setItem('isLoggedin', this.isLoggedin);
                this.storageService.setItem('userLogged', data);
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

}
