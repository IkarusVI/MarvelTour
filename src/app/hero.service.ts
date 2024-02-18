import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';
import { ApiResponse } from './api-response';


@Injectable({ providedIn: 'root' })
export class HeroService {

  
  private baseUrl = "https://gateway.marvel.com/v1/public/characters";
  private credentials = '&ts=ironman&apikey=35eb67b1582b845d5d1076ff9b4371bc&hash=3c1f59ca8ad07f4e16f8ba00cc2578e2';
  private heroesUrl = 'https://gateway.marvel.com/v1/public/characters?ts=ironman&apikey=35eb67b1582b845d5d1076ff9b4371bc&hash=3c1f59ca8ad07f4e16f8ba00cc2578e2';
  


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    const random = Math.floor(Math.random() * 1000) + 1;
    return this.http.get<ApiResponse>(`${this.heroesUrl}&limit=20&offset=${random}`)
      .pipe(
        map(response => {
          if (!response || !response.data || !Array.isArray(response.data.results)) {
            throw new Error('Respuesta de API inesperada');
          }
          return response.data.results as Hero[];
        }),
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHeroesLimited(page: number): Observable<Hero[]> {
    const random = Math.floor(Math.random() * 1000) + 1;
    const url = `${this.baseUrl}&limit=${page}&offset=${random}&${this.credentials}`;
  
    return this.http.get<ApiResponse>(url).pipe(
      map(response => {
        if (!response || !response.data || !Array.isArray(response.data.results)) {
          throw new Error('Respuesta de API inesperada');
        }
        return response.data.results as Hero[];
      }),
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroesLimited', []))
    );
  }
  
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
  
    const url = `${this.baseUrl}?name=${term}&${this.credentials}`;
  
    return this.http.get<ApiResponse>(url).pipe(
      map(response => {
        if (!response || !response.data || !Array.isArray(response.data.results)) {
          throw new Error('Respuesta de API inesperada');
        }
        return response.data.results as Hero[];
      }),
      tap(heroes => {
        if (heroes && heroes.length > 0) {
          this.log(`found heroes matching "${term}"`);
        } else {
          this.log(`no heroes matching "${term}"`);
        }
      }),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.baseUrl}id=${id}${this.credentials}`
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.baseUrl}?id=${id}${this.credentials}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }


  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
function random_int(arg0: number, arg1: number) {
  throw new Error('Function not implemented.');
}

