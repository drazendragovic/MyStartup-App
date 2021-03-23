import { Component, Input, OnInit } from '@angular/core';
import { NotificationService, TvStation, Show, Genre, AccountService } from '@app/@core';
import { environment } from '@env/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ShowService } from '../../services/show.service';
import { ShowDetailsComponent } from '../show-details/show-details.component';

@Component({
  selector: 'show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss']
})
export class ShowCardComponent implements OnInit {
  @Input() shows: Show[] | any;
  @Input() genres: Genre[] | any;
  photoUrl = environment.photoUrl;
  bsModalRef!: BsModalRef;

  constructor(
    private _showService: ShowService,
    private _authService: AccountService,
    private _notify: NotificationService,
    private _accountService: AccountService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  userLogged() {
    return this._accountService.isUserLogged();
  }

  openShowDetails(show: Show | any) {
    const initialState = {
      show
    };
    this.bsModalRef = this.modalService.show(ShowDetailsComponent, {initialState, class: "show-details"});
  }

  subscription() {

  }

}
