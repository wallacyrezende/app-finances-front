import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserDTO, User } from '../../service/user/User';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiURL = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    authLogin(userData: UserDTO): Observable<User> {
        return this.http
            .post<User>(
                this.apiURL + '/api/usuarios/autenticar',
                JSON.stringify(userData),
                this.httpOptions
            )
            .pipe(catchError(this.handleError));
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        const isLoggedIn = localStorage.getItem('isLoggedin')!;
        return (user !== null) && (isLoggedIn != null) ;
    }

    logout() {
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['login']);
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = error.error;
        }
        console.log(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
}