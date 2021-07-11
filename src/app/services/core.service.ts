import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { appConstants } from './../contants/common-constants';
@Injectable({
  providedIn: 'root'
})
export class CoreService {
  lastOneMonthCommits: string;
  repos: string;

  constructor(private http: HttpClient) {
    this.lastOneMonthCommits = moment(new Date).subtract(1, "month").format("YYYY-MM-DD");
  }

  getRepositories(query: string): Observable<any> | null {
    if (query) {
      this.repos = query;
      const language = appConstants.LANGUAGE;
      const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=org:${query}+language:${language}&type=Repositories`);
      return this.http.get(endpoint);
    }
    return;
  }

  getCommits(query: string): Observable<any> | null {
    if (query) {
      console.log(environment.api_key.replace(/%/g, ''))
      const headerDict = {
        Accept: 'application/vnd.github.cloak-preview+json',
        Authorization: `token ${environment.api_key.replace(/%/g, '')}`
      }
      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };
      const endpoint = window.encodeURI(`https://api.github.com/search/commits?q=repo:${this.repos}/${query}+committer-date:>${this.lastOneMonthCommits}`);
      return this.http.get(endpoint, requestOptions);
    }
    return;
  }
}
