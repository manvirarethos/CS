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
import { TaskService, HttpClient, SortingService, MenuService } from '../_services/_index';

// Task Components for List, Add, Edit and Delete Oprations
import { TaskAddComponent } from './addtask/task.component';
import { TaskEditComponent } from './edittask/task.edit.component';
import { TaskListComponent } from './listtask/task.list.component';
import { MenuListComponent } from './menu/menu.component';

import { ConfirmDeactivateGuard } from '../_guards/onchange.guard';

@NgModule({
    declarations: [
        TaskListComponent,
        TaskAddComponent,
        TaskEditComponent,
        MenuListComponent


    ],
    imports: [

        CommonModule,
        FormsModule,
        SelectModule,
        Ng2PaginationModule,
        SharedModule,
        RouterModule.forChild([
            { path: 'task/tasklist', component: TaskListComponent },
            { path: 'task/add', component: TaskAddComponent },
            { path: 'task/edit/:id', component: TaskEditComponent,canDeactivate:[ConfirmDeactivateGuard] },
            { path: 'task/menulist', component: MenuListComponent },
        ])
    ],
    providers: [TaskService, HttpClient, SortingService, MenuService,ConfirmDeactivateGuard]

})
export class TaskModule {

}
