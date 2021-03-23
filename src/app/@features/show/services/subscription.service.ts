import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationService, Show } from "@app/@core";
import { ApiResponse } from "@app/@core/models/response";
import { ApiService } from "@app/@core/services/api.service";
import { environment } from "@env/environment";
import { Observable, Subscription } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  apiUrl = environment.serverUrl + "Subscription/";

  constructor(private _http: HttpClient, private _apiService: ApiService, private _notify: NotificationService) { }

  getTvStationsWithShows(): Observable<ApiResponse<Subscription>> {
    return this._apiService.get(this.apiUrl + 'GetTvStationsWithShows');
  }

  emisijaPretplata(userId: string, showId: number, status: number) {
    return this._apiService.post(this.apiUrl + 'emisije/' + userId + '/pretplata/' + showId + '/' + status, {});
  }

  getUserSubscription(showId: number, userId: string): Observable<ApiResponse<Subscription>> {
    let params = new HttpParams();
    params = params.append('ShowId', showId.toString());
    params = params.append('UserId', userId);
    return this._apiService.get(this.apiUrl + 'GetUserSubscriptionById', params);
  }

  dohvatiPretplateKorisnika(id: number) {
    return this._apiService.get(this.apiUrl + 'emisije/' + id + '/pretplata');
  }

}
