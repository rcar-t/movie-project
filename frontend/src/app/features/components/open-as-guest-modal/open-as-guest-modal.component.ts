import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-open-as-guest-modal',
  templateUrl: './open-as-guest-modal.component.html',encapsulation: ViewEncapsulation.None,
  styleUrls: ['./open-as-guest-modal.component.less']
})
export class OpenAsGuestModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

}
