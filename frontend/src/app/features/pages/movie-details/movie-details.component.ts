import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.less']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movieId: string;
  movie: Movie;
  posterUrl: string;
  private subscriptions: Subscription;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private movieService: MovieService,
  ) { 
    this.movieId = '';
    this.posterUrl = '';
    this.movie = {} as Movie;
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.subscriptions.add( this.ActivatedRoute.params.subscribe((params: Params) => {
      this.movieId = params['id'];
      this.getMovieDetails(this.movieId);
      this.getMoviePoster();
    }))
  }

  getMovieDetails(id: string): void {
    this.subscriptions.add(
      this.movieService.getMovieDetails(id)
        .subscribe((movie: Movie) => {
          this.movie = movie;
          console.log(movie);
        })
    )
  }

  getMoviePoster(): void {
    this.subscriptions.add(
      this.movieService
        .getBaseImageUrl("w500")
        .subscribe((base_url:string) => {
          this.posterUrl = base_url;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
