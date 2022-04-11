import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ReleasesDTO } from './releases';
@Injectable({
    providedIn: 'root',
})
export class ReleasesService {

    prefixAPI = '/api/releases';
    apiURL = environment.apiUrl.concat(this.prefixAPI);

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
            this.apiURL + '/last-releases/' + userId
        )
        .pipe(retry(1), catchError(this.handleError));
    }

    getReleases(userId: number, page: number, size: number): Observable<any> {
        let params = new HttpParams().set('page', page).set('size', size);
        return this.http
        .get<any>(
            this.apiURL + '/' + userId + '/releases-paginated',
            { params: params }
        )
        .pipe(retry(1), catchError(this.handleError));
    }

    createRelease(release: ReleasesDTO): Observable<any> {
        return this.http
            .post<any>(
                this.apiURL + '/create-release', 
                release,
                this.httpOptions
            )
            .pipe(retry(1), catchError(this.handleError));
    }

    updateStatus(releaseId: number, status: string): Observable<any> {
        let params = new HttpParams().set('status', status);
        return this.http
            .put<any>(
                this.apiURL + '/' + releaseId +'/update-status', 
                params
            )
            .pipe(retry(1), catchError(this.handleError));
    }

    update(release:  ReleasesDTO): Observable<any> {
        return this.http
            .put<any>(
                this.apiURL, 
                release
            )
            .pipe(retry(1), catchError(this.handleError));
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(() => {
            return errorMessage;
        });
    }
}