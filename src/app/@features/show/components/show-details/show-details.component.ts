import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountService, NotificationService, Show, Subscription } from '@app/@core';
import { ApiResponse } from '@app/@core/models/response';
import { environment } from '@env/environment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShowDetailsComponent implements OnInit {
  show!: Show;
  subscription!: Subscription;
  subscriptionStatus = false;
  status?: number = 0;
  photoPath = environment.photoUrl;

  value: number = 1;
  max: number = 5;
  color: any = "accent";
  disabled: boolean = false;
  readonly: boolean = false;
  dense: boolean = false;

  constructor(
    public _bsModalRef: BsModalRef,
    private _accountService: AccountService,
    private _notify: NotificationService,
    private _subscriptionService: SubscriptionService) { }

  ngOnInit() {
    this.loadSubscription(this.show.showId as number);
  }

  userLogged() {
    return this._accountService.isUserLogged();
  }

  loadSubscription(showId: number) {
    if(this._accountService.decodedToken !== undefined) {
      this._subscriptionService.getUserSubscription(showId, this._accountService.decodedToken.nameid).subscribe((subscription: ApiResponse<Subscription> | any) => {
        this.subscription = subscription.data as Subscription;

        if (this.subscription !== null && this.subscription.status !== 0) {
          this.subscriptionStatus = true;
          this.status = this.subscription.status;
        }
      }, error => {
        this._notify.onError(error);
      });
    }
  }

}
