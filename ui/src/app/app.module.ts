import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule }  from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// Shard Module
import { SharedModule } from './shared/shared.module';
// Application Modules 
import {CompanyUserModule} from './Users/CompanyUser/companyuser.module';
import {TaskModule} from './task/task.module';
import {RoleModule} from './roles/role.module';
// End of Application Modules

// Services 
import {AuthService,StorageService} from './_services/_index';
import {AppConfig} from './app.config';
@NgModule({
  declarations: [
    AppComponent,LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([]),
    CompanyUserModule,SharedModule,TaskModule,RoleModule
    
  ],
  providers: [AppConfig,AuthService,StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
