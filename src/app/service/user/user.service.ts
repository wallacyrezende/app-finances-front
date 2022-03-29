import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserDTO } from './User';
import { User } from './User';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    apiURL = environment.apiUrl;
    constructor(
        private http: HttpClient,
    ) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    authUser(userDTO: UserDTO): Observable<User> {
        return this.http
            .post<User>(
                this.apiURL + '/api/usuarios/autenticar',
                JSON.stringify(userDTO),
                this.httpOptions
            )
            .pipe(retry(1), catchError(this.handleError));
    }

    getBalance(userId: number): Observable<number> {
        return this.http
        .get<number>(
            this.apiURL + '/api/usuarios/' + userId + '/saldo'
        )
        .pipe(retry(1), catchError(this.handleError));
    }

    // Error handling
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