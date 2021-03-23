import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Genre, Show, TvStation } from '@app/@core/models';
import { animations } from '@app/@shared/animations';
import { environment } from '@env/environment';

@Component({
  selector: 'tvstation-shows-list',
  templateUrl: './tvstation-shows-list.component.html',
  styleUrls: ['./tvstation-shows-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [animations]
})
export class TvstationShowsListComponent implements OnInit {
  @Input() shows: Show[] | any;
  @Input() genres: Genre[] | any;
  customClass = 'customClass';
  isOpen = true;
  photoUrl = environment.photoUrl;

  constructor() { }

  ngOnInit() {
  }

}
