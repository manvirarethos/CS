import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, RequestMethod } from '@angular/http';
import { StorageService } from './storage.service';
import { Processing, CloseModal } from '../app.helpers';
import { AppConfig } from '../app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class HttpClient {
config:any;
BaseURL:string;
    constructor(private http: Http, private storage: StorageService, private appConfig: AppConfig) { 
        this.config = appConfig.getConfig();
        this.BaseURL=this.config.apiurl;
    }

    createAuthorizationHeader(headers: Headers) {
        let currentUser = this.storage.get("csmsuser");
    
        headers.append('token', currentUser['token']);
        headers.append('Authorization', btoa(currentUser['user'].Email + ":" + currentUser['user'].Password));

    }

    get(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        Processing("#Processing","block");
        return this.http.get( this.BaseURL+url, {
            headers: headers
        })  .map(this.handlerData)       
        
            .catch(this.handleError);
    }
    delete(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete( this.BaseURL+url, {
            headers: headers
        }) .map(this.handlerData)
            .catch(this.handleError);
    }
    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post( this.BaseURL+url, data, {
            headers: headers
        }) .map(this.handlerData)
            .catch(this.handleError);
    }
    put(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put( this.BaseURL+url, data, {
            headers: headers
        }) .map(this.handlerData)
            .catch(this.handleError);
    } 
    private handleError(error: Response) {
      
        return Observable.throw({ requestStatus: 0, msg: "Server error", arr: [] });
    }

    private handlerData(error: Response) {
      
        Processing("#Processing","none");
        return error.json();
    }
}