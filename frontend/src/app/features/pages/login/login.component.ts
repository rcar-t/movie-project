import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  public user: User ; 
  public retUrl: string = "";
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.user = {} as User;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.queryParamMap
      .subscribe( (params) => {
        this.retUrl = params.get('retUrl') || "";
      })
    );
  }

  onSubmit(): void{
    this.authenticationService
      .login(this.user)
      .subscribe( data => {
          this.router.navigate([this.retUrl]);
        }
      );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
