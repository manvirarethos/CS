import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from './httpclient.service';


@Injectable()
export class RoleService {

     constructor(private http: HttpClient,private _http:Http)
    { }



      // Get All headings
    GetAll() {
        return this.http.get("/role");
    }
    // Get heading By ID
    GetOne(id) {
        return this.http.get("/role/" + id);
    }

    // Add New heading
    Add(data) {
        return this.http.post("/role", data);
    }

    // Update Existing heading
    Update(data) {
        return this.http.put("/role/" + data._id, data);
    }

    // Delete heading By ID
    Delete(data) {
        console.log("heading ID",data);
        return this.http.delete("/role/" + data);
    }

    // Add New heading
    GetColumnWise(data) {
        return this.http.post("/role/columns", data);
    }

   
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return JSON.parse("{rstatus:1,msg:'error',data:[]}");
    }



}
