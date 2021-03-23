import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationService, Show, TvStation } from "@app/@core";
import { ApiResponse } from "@app/@core/models/response";
import { ApiService } from "@app/@core/services/api.service";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TvStationService {
  apiUrl = environment.serverUrl;

  constructor(private _http: HttpClient, private _apiService: ApiService, private _notify: NotificationService) { }

  getTvStations(): Observable<ApiResponse<TvStation[]>> {
    return this._apiService.get(this.apiUrl + 'TvStation/' + 'GetTvStations');
  }

  getTvStationsWithShows(): Observable<ApiResponse<TvStation[]>> {
    return this._apiService.get(this.apiUrl + 'TvStation/' + 'GetTvStationsWithShows');
  }

  getTvStationShows(id: number): Observable<ApiResponse<TvStation>> {
    return this._apiService.get(this.apiUrl + 'TvStation/' + 'GetTvStationWithShows?id=' + id);
  }
}
