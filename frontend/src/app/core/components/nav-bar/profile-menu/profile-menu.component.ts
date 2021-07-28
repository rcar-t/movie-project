import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.less']
})
export class ProfileMenuComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void { }

  logout(): void {
    this.authenticationService.logout();
  }
}
