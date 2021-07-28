import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from '../../models/alert';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less']
})
export class AlertComponent implements OnInit, OnDestroy {
  // private subscription: Subscription;
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription: Subscription = new Subscription();
  routeSubecription: Subscription = new Subscription()

  constructor(
    private alertService: AlertService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        if (!alert.message) {
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        this.alerts.push(alert);

        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      })
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      alert.fade = true;

      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-error',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning',
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}
