import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// More 3rd Party Modules / Components
import { Ng2PaginationModule } from 'ng2-pagination';
import { SelectModule } from 'ng2-select';

// Shard Module
import { SharedModule } from '../../shared/shared.module'

// Company User Components for List, Add, Edit and Delete Oprations
import { CompanyUserListComponent } from './companyuser-list.component';
import { CompanyUserAddComponent } from './companyuser-add.component';
import { CompanyUserEditComponent } from './companyuser-edit.component';


// Services for the Module
import {UserService,HttpClient } from '../../_services/_index';


@NgModule({
  declarations: [
    CompanyUserListComponent,
    CompanyUserAddComponent,
    CompanyUserEditComponent,
    
    
  ],
  imports: [

    CommonModule,
    FormsModule,
    SelectModule,
    Ng2PaginationModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'company/users', component: CompanyUserListComponent },
      { path: '', component: CompanyUserListComponent },
      { path: 'company/user/add', component: CompanyUserAddComponent },
      { path: 'company/user/edit/:id', component: CompanyUserEditComponent }
    ])
  ],
  providers:[UserService,HttpClient]

})
export class CompanyUserModule {

}
