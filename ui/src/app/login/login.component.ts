import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService, StorageService } from "../_services/_index";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',

})

export class LoginComponent implements OnInit {

    @Output() LoginUser = new EventEmitter<boolean>();
    loginModel: any = { username: '', password: '' }
    constructor(private service: AuthService, private cacheService: StorageService) {

    }


    LoginMe() {
        console.log("User Loged In", this.loginModel);
        this.service.ValidateUser(this.loginModel).subscribe(m => {
            console.log("Data from Server", m);
            if (m.requestStatus == 1) {
                this.cacheService.add("csmsuser", m);
                this.LoginUser.emit(true);
            }
        });
   // this.LoginUser.emit(true);

    }


    ngOnInit() {

    }



}