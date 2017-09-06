import { Component, OnInit, AfterViewInit,  ElementRef, ViewEncapsulation } from '@angular/core';
import { correctHeight, detectBody, smoothlyMenu, BindAll } from './app.helpers';

import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  providers: []
})
export class AppComponent {
  title = 'app works!';
  LogedIn: boolean = false;
  CurrentUser: any;
  $el: any;
  constructor(el: ElementRef,private service:StorageService) {
    this.$el=el;
  }
  ngOnInit() {
   var data=  this.service.get('csmsuser');
   if(data!=undefined)
    {
      console.log("Current User",data);
      this.LogedIn=true;
       setTimeout(() => {
            correctHeight();
            BindAll();
        }, 1000);
    
    }
  }

  AfterLogIn(data) {
    this.LogedIn = true;
   setTimeout(() => {
            correctHeight();
            BindAll();
        }, 1000);
    
  }
  LogOut(){
    this.LogedIn=false;
    this.service.remove('csmsuser');
  }
}
