import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env} from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User) {
    return this.http.post<any>(`${env.SPRING_URL}/auth/login`, user)
      .pipe(map(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.payload));
        this.currentUserSubject.next(response.payload);
        return response.payload;
      }));
  }

  getUser(): Observable<User> {
    return this.currentUser;
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.currentUser ? of(true) : of(false);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({} as User);
  }
}
