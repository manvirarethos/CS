import { Injectable } from '@angular/core';
import { HttpClient } from './httpclient.service';



@Injectable()
export class TaskService {
    config: any;
    constructor(private http: HttpClient)
    { }



    // Get All Tasks
    GetAll() {
        return this.http.get("/Task");
    }
    // Get Task By ID
    GetOne(id) {
        return this.http.get("/Task/" + id);
    }

    // Add New Task
    Add(data) {
        return this.http.post("/Task", data);
    }

    // Update Existing Task
    Update(data) {
        return this.http.put("/Task/" + data._id, data);
    }

    // Delete Task By ID
    Delete(data) {
        console.log("Task ID",data);
        return this.http.delete("/Task/" + data);
    }


}