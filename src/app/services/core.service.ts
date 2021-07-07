import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  getRepositories(query: string) {
    const language = "javascipt";
    // const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
    if (query) {
      const endpoint = window.encodeURI(`https://api.github.com/users/${query.trim()}/repos`);
      this.http.get(endpoint).subscribe(res => console.log(res));
    }

  }
}
