import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationService, Show } from "@app/@core";
import { ApiResponse } from "@app/@core/models/response";
import { ApiService } from "@app/@core/services/api.service";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  apiUrl = environment.serverUrl + "Show/";;

  constructor(private _http: HttpClient, private _apiService: ApiService, private _notify: NotificationService) { }

}
