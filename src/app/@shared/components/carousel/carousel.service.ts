import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../../../@core/services/api.service';
import { Slide } from '../../../@core/models/slide';


@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  baseUrl = environment.serverUrl + 'Slide/';

  constructor(private apiService: ApiService, private http: HttpClient) { }

  getAllSlides(pageNumber:any, pageSize:any): Observable<Slide[]> {
    let params = new HttpParams();

    if (pageNumber != null && pageSize != null) {
      params = params.append('PageNumber', pageNumber);
      params = params.append('PageSize', pageSize);
    }
    return this.http.get<Slide[]>(this.baseUrl + "GetAllSlides");
  }
}
