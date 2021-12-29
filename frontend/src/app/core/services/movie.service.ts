import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Image, Movie } from '../models/movie';
import { environment as env } from 'src/environments/environment';
import { APIResponse } from '../models/response';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  params: HttpParams;

  constructor(private http: HttpClient) { 
    this.params = new HttpParams()
      .set("api_key", env.MOVIE_API_KEY);
  }

  getNowShowing() :Observable<APIResponse<Movie>>{
    return this.http.get<APIResponse<Movie>>(`${env.MOVIE_DB_URL}/movie/now_playing`, {
      params: this.params,
    });
  }

  getBaseImageUrl(posterSize: string) :Observable<any> {
    return this.http.get<any>(`${env.MOVIE_DB_URL}/configuration`, {
      params: this.params
    }).pipe(
      map(
        (response) => {
          return response.images.base_url + posterSize;
        }
      ),
      catchError( 
        (error) => {
          return throwError(error);
        }
      )
    );
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get<any>(`${env.MOVIE_DB_URL}/movie/${id}`, {
      params: this.params
    });
  }
}
