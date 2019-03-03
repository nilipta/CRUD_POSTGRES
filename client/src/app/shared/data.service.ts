import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from './data.model';
import { Router } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConfigService {
    private configs: Config[] = [];
    private postUpdated = new Subject<Config[]>();

    constructor(private http: HttpClient, private router: Router) { }

    /** GET heroes from the server */
    getConfigs(apiUrl: string): Observable<Config[]> {
        let url_temp = 'http://localhost:3000/api/' + apiUrl;
        console.log('url got ' + url_temp);
        return this.http.get<Config[]>(url_temp)
            .pipe(
                tap(_ => console.log('fetched heroes')),
                catchError(this.handleError('getHeroes', []))
            );
    }

    /** POST: add a new hero to the server */
    addConfig(config: Config, apiUrl: string): Observable<Config> {
        return this.http.post<Config>('http://localhost:3000/api/' + apiUrl, config, httpOptions).pipe(
            tap((newHero: Config) => console.log(`added hero w/ id=${newHero}`)),
            catchError(this.handleError<Config>('addHero'))
        );
    }

    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}