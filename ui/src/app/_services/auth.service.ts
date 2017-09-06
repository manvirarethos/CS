import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, RequestMethod } from '@angular/http';
import { StorageService } from './storage.service';
 import { AppConfig } from '../app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
declare var swal: any;


@Injectable()
export class AuthService {
    config: any;
    constructor(private http: Http, config: AppConfig, private storageService: StorageService)
    { this.config = config.getConfig(); }



    //  getting all country 

     ValidateUser(data) {

      //  let currentUser = this.storageService.get('currentUser');
      //  let headers = new Headers({ 'Content-Type': 'application/json', 'token': currentUser['token'].toString() });
        let options ={};// new RequestOptions({ method: RequestMethod.Post, headers: headers });

        return this.http.post(this.config.apiloginurl + "/login", data, options).map((response: Response) => response.json());

    }




    private handleError(error: Response) {
        // In a real world app, we might use a remote logging infrastructure
        //  alert('Server Error');
        //  console.error(error);
        return Observable.throw({ sts: 0, msg: "Server error", arr: [] });
    }
}