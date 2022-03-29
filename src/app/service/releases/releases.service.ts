import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ReleasesDTO } from './releases';
@Injectable({
    providedIn: 'root',
})
export class ReleasesService {

    apiURL = environment.apiUrl;
    constructor(
        private http: HttpClient
    ) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    getLastReleases(userId: number): Observable<ReleasesDTO[]> {
        return this.http
        .get<ReleasesDTO[]>(
            this.apiURL + '/api/releases/last-releases/' + userId
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
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
}