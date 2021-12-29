import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/core/models/movie';
import { APIResponse } from 'src/app/core/models/response';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.less']
})
export class MovieListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  public movies: Array<Movie>;
  public posterUrl: string;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.subscriptions = new Subscription();
    this.movies = new Array<Movie>();
    this.posterUrl = "";
  }

  ngOnInit(): void {
    this.getNowShowing();
    this.getMoviePoster();
  }

  getNowShowing(): void {
    this.subscriptions.add(
      this.movieService
        .getNowShowing()
        .subscribe((movieList: APIResponse<Movie>) => {
          this.movies = movieList.results;
          console.log(movieList);
        })
    );
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

  openMovieDetails(id: string): void {
    this.router.navigate(['movie', id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
