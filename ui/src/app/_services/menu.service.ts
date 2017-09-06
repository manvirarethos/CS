import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from './httpclient.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Menu } from '../_models/_index.model';


@Injectable()
export class MenuService {
    private _headingBaseUrl = 'assets/menu.json';  
     constructor(private http: HttpClient,private _http:Http)
    { }


    getMenus(): Observable<Menu[]> {
        return this._http.get(this._headingBaseUrl)
            .map((response: Response) => <Menu[]>response.json())
            .catch(this.handleError);
    }
    
    

      // Get All headings
    GetAll() {
        return this.http.get("/heading");
    }
    // Get heading By ID
    GetOne(id) {
        return this.http.get("/heading/" + id);
    }

    // Add New heading
    Add(data) {
        return this.http.post("/heading", data);
    }

    // Update Existing heading
    Update(data) {
        return this.http.put("/heading/" + data._id, data);
    }

    // Delete heading By ID
    Delete(data) {
        console.log("heading ID",data);
        return this.http.delete("/heading/" + data);
    }

    // Add New heading
    GetColumnWise(data) {
        return this.http.post("/heading/columns", data);
    }

    // Add New heading
    GetDBMenu() {
        return this.http.get("/menu/list");
    }
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return JSON.parse("{rstatus:1,msg:'error',data:[]}");
    }



}
