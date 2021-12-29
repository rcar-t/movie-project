import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/core/models/movie';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { OpenAsGuestModalComponent } from '../../components/open-as-guest-modal/open-as-guest-modal.component';

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
  loggedIn: boolean = false;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private modalService: NgbModal,
    private authService: AuthenticationService,
    private router: Router
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

  isLoggedIn(): boolean {
    this.subscriptions.add(
      this.authService.isUserLoggedIn()
      .subscribe( (result) => {
        this.loggedIn = result;
      }
    ));
    return this.loggedIn;
  }

  openLogin() {
    if (this.isLoggedIn()) {
      this.router.navigate(['book', this.movieId]);
    } else {
      const modalRef = this.modalService.open(OpenAsGuestModalComponent, { centered: true });
      modalRef.componentInstance.name = 'Open as Gueat';
    }
    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
