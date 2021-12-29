import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env} from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userUrl: string;

  constructor(private http: HttpClient) { 
    this.userUrl = env.SPRING_URL+"/api/user";
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/signup`, user);
  }

}
