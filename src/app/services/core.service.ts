import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConstants } from './../contants/common-constants';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  getRepositories(query: string): Observable<any> | null {
    if (query) {
      const language = appConstants.LANGUAGE;
      const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=org:${query}+language:${language}&type=Repositories`);
      return this.http.get(endpoint);
    }
    return;
  }
}
