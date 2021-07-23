import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserServiceService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  public user: User;

  constructor(
    private userService: UserServiceService,
    private router: Router,
  ) { 
    this.user = {} as User;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService
      .signup(this.user)
      .subscribe(result => this.gotoHome());
  }

  gotoHome(): void {
    this.router.navigate(["/login"]);
  }

}
