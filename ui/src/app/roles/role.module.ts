import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// More 3rd Party Modules / Components
import { Ng2PaginationModule } from 'ng2-pagination';
import { SelectModule } from 'ng2-select';

// Shard Module
import { SharedModule } from '../shared/shared.module'

// Services for the Module
import { RoleService, HttpClient, SortingService,MenuService } from '../_services/_index';

// Task Components for List, Add, Edit and Delete Oprations
import { RoleAddComponent } from './addrole/role.add.component';
import { RoleEditComponent } from './editrole/role.edit.component';
import { RoleListComponent } from './listrole/role.component';



@NgModule({
    declarations: [
        RoleListComponent,
        RoleAddComponent,
        RoleEditComponent


    ],
    imports: [

        CommonModule,
        FormsModule,
        SelectModule,
        Ng2PaginationModule,
        SharedModule,
        RouterModule.forChild([
            { path: 'role/list', component: RoleListComponent },
            { path: 'role/add', component: RoleAddComponent },
            { path: 'role/edit/:id', component: RoleEditComponent }
          
        ])
    ],
    providers: [RoleService, HttpClient, SortingService,MenuService]

})
export class RoleModule {

}
