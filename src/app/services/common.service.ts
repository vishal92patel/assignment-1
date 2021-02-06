import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private httpClient: HttpClient) { }
    getUserInfo(): Observable<any> {
        return this.httpClient.get(this.getUrl(), { observe: "response" });
    }
    getUrl(): string {
        // return "https://jsonplaceholder.typicode.com/todos/1";
        return "/assets/data.json";
    }
}
