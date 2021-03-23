import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Genre, Show, TvStation } from '@app/@core/models';
import { ApiResponse } from '@app/@core/models/response';
import { NotificationService } from '@app/@core/services';
import { animations } from '@app/@shared/animations';
import { environment } from '@env/environment';
import { flatten } from 'lodash';
import { error } from 'selenium-webdriver';
import { TvStationService } from '../../services/tvstation.service';

@Component({
  selector: 'tvstations-list',
  templateUrl: './tvstations-list.component.html',
  styleUrls: ['./tvstations-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [animations]
})
export class TvstationsListComponent implements OnInit {
  tvStations!: TvStation[];
  tvStation!: TvStation;
  selectTv = false;
  tvShows!: Show[];
  showGenres!: Genre[];
  tvStationLogoUrl = environment.photoUrl;

  constructor(
    private _stationService: TvStationService,
    private _notify: NotificationService
  ) { }

  ngOnInit() {
    this.getTvStations();
  }

  getTvStations() {
    this._stationService.getTvStationsWithShows().subscribe((data: ApiResponse<TvStation[]>) => {
      this.tvStations = (data.data as TvStation[]).filter(station => station.showsTotal as number > 0);
      this.tvShows = Array.prototype.concat.apply([], [...new Set(this.tvStations.map(t => t.shows as Show))]);
      this.showGenres = this.tvShows.map<Genre>(g => g.genre as Genre).filter((thing, i, arr) => arr.findIndex(t => t.genreId === thing.genreId) === i);
    }, error => {
      this._notify.onError(error);
    });
  }

  getTvStationShows(id: number) {
    this._stationService.getTvStationShows(id).subscribe((station: ApiResponse<TvStation>) => {
      this.tvStation = station.data as TvStation;
      this.tvShows = this.tvStation.shows as Show[];
      this.showGenres = this.tvShows.map<Genre>(s => s.genre as Genre).filter((thing, i, arr) => arr.findIndex(t => t.genreId === thing.genreId) === i);
      this.selectTv = true;
    }, error => {
      this._notify.onError(error);
    });
  }

}
