import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DatasetResponse } from '../googlefitmodel/datasetresponse';
import { DatapointResponse } from '../googlefitmodel/datapointresponse';
@Injectable({
    providedIn: 'root',
})
export class GoogleFitService {

    // Base url
    baseurl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    getSteps(localDate: string): Observable<DatasetResponse> {
        return this.http
            .get<DatasetResponse>(`${this.baseurl}/steps?localDate=${localDate}`)
            .pipe(retry(1), catchError(this.errorHandl));
    }

    getActiveMinutes(localDate: string): Observable<DatasetResponse> {
        return this.http
            .get<DatasetResponse>(`${this.baseurl}/activeminutes?localDate=${localDate}`)
            .pipe(retry(1), catchError(this.errorHandl));
    }

    getDistance(localDate: string): Observable<DatasetResponse> {
        return this.http
            .get<DatasetResponse>(`${this.baseurl}/distance?localDate=${localDate}`)
            .pipe(retry(1), catchError(this.errorHandl));
    }

    getCaloriesRest(localDate: string): Observable<DatasetResponse> {
        return this.http
            .get<DatasetResponse>(`${this.baseurl}/caloriesrest?localDate=${localDate}`)
            .pipe(retry(1), catchError(this.errorHandl));
    }

    getCaloriesExpended(localDate: string): Observable<DatasetResponse> {
        return this.http
            .get<DatasetResponse>(`${this.baseurl}/caloriesexpended?localDate=${localDate}`)
            .pipe(retry(1), catchError(this.errorHandl));
    }

    getHeartValues(localDate: string): Observable<DatasetResponse> {
        return this.http
            .get<DatasetResponse>(`${this.baseurl}/heartrate?localDate=${localDate}`)
            .pipe(retry(1), catchError(this.errorHandl));
    }

    getHeight(): Observable<DatapointResponse> {
        return this.http
            .get<DatapointResponse>(`${this.baseurl}/height`)
            .pipe(retry(1), catchError(this.errorHandl));
    }

    getWeight(): Observable<DatapointResponse> {
        return this.http
            .get<DatapointResponse>(`${this.baseurl}/weight`)
            .pipe(retry(1), catchError(this.errorHandl));
    }

    // Error handling
    errorHandl(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
}