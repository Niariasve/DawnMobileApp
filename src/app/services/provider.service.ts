import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private url: string = 'https://visitasespol-default-rtdb.firebaseio.com/collection.json';

  constructor(private http: HttpClient) { }

  getResponse() {
    return this.http.get(this.url);
  }

  postResponse(data: any) {
    return this.http.post(this.url, data);
  }
}
