import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
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

    getBalance(userId: number): Observable<number> {
        return this.http
        .get<number>(
            this.apiURL + '/api/user/' + userId + '/balance'
        )
        .pipe(retry(1), catchError(this.handleError));
    }

    getExtractByReleaseType(userId: number, releaseType: string): Observable<number> {
        let params = new HttpParams().set('releaseType', releaseType);
        return this.http
        .get<number>(
            this.apiURL + '/api/user/' + userId + '/extract',
            { params: params }
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