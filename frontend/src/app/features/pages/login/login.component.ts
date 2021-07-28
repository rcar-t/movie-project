import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  public user: User ; 
  public retUrl: string = "";
  public loading: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
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
      },
      err => {
        this.alertService.error(err);
      })
    );
  }

  onSubmit(): void{
    this.authenticationService
      .login(this.user)
      .subscribe( data => {
          this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          }
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.retUrl]);
        }
      );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
