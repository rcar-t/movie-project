import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { Movie } from '../../models/movie';
import { APIResponse } from '../../models/response';
import { AuthenticationService } from '../../services/authentication.service';
import { MovieService } from '../../services/movie.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  private subscriptions: Subscription = new Subscription();
  public loggedIn: boolean;
  public movies: Array<Movie> = [];
  searchControl = new FormControl();
  filteredOptions: Observable<string[]> = new Observable<string[]>();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private movieService: MovieService) { 
      this.loggedIn = false;
    }

  ngOnInit(): void {
    this.isLoggedIn();
    this.getNowShowing();

    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      )
  }

  isLoggedIn(): void {
    this.subscriptions.add(
      this.authService.isUserLoggedIn()
      .subscribe( (result) => {
        this.loggedIn = result;
      }
    ))
  }

  getNowShowing(): void {
    this.subscriptions.add(
      this.movieService
        .getNowShowing()
        .subscribe((movieList: APIResponse<Movie>) => {
          this.movies = movieList.results;
        })
    );
  }

  onSubmit(form: NgForm): void{
    let search: string = this.searchControl.value;
    
    let movieId: string = '';
    this.movies
      .filter((movie) => {
        if (movie.title.toLowerCase().includes(search.toLowerCase())) {
          movieId = movie.id.toString()
        } 
      });
    
    if (movieId != null && movieId.length > 0) {
      this.router.navigate(['movie', movieId]);
    } else {
      throwError("Movie cannot be found");
    }
    
  }
  
  private _filter(value: string) :string[] {
    const filterValue = value.toLowerCase();
    const options = this.movies.map(movie => movie.title)
    return options.filter(option => option.toLowerCase().includes(filterValue))
  }
 
}
