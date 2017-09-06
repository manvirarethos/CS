import { Injectable } from '@angular/core';
import { HttpClient } from './httpclient.service';



@Injectable()
export class UserService {
    config: any;
    constructor(private http: HttpClient)
    { }



    // Get All Users
    GetAll() {
        return this.http.get("/user");
    }
    // Get User By ID
    GetOne(id) {
        return this.http.get("/user/" + id);
    }

    // Add New User
    Add(data) {
        return this.http.post("/user", data);
    }

    // Update Existing User
    Update(data) {
        return this.http.put("/user/" + data._id, data);
    }

    // Delete User By ID
    Delete(data) {
        console.log("User ID",data);
        return this.http.delete("/user/" + data);
    }


}