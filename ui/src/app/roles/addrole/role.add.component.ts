import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloseModal, ValidateMe, ValidationCheck } from '../../app.helpers';
import { RoleService, MenuService } from '../../_services/_index';
@Component({
    selector: 'app-addrole',
    templateUrl: './role.add.component.html',

})
export class RoleAddComponent {

    taskModel: any = {
        Name: '',
        Title: '',
        RoleForUserType: '',
        Status: '',
        Tasks: []
    };
    Headings: any;
    Msg: string;
    private value: any = {};

    constructor(private _router: Router, private _service: RoleService, private _menuSerive: MenuService) {
    }
    ngOnInit() {
        ValidateMe("#taskForm");
        this.GetHeading();

    }
    ngAfterViewInit() { }

    onBack() {
        this._router.navigate(['/role/list']);
    }


    public btnOK(ID) {

        CloseModal("#commonModal");


    }

    CheckTask(task, event) {
        console.log("Event Data", event);
        if (event == true) {
            this.taskModel.Tasks.push(task._id)
        }
        else {
            this.taskModel.Tasks.splice(this.taskModel.Tasks.indexOf(task._id), 1);

        }
        console.log("Selected Tasks", this.taskModel.Tasks);
    }

    GetHeading() {
        this._menuSerive.GetDBMenu().subscribe(m => {
            console.log("Menu Data", m);
            this.Headings = m.lstData;
        });
    }

    Save() {
        if (ValidationCheck("#taskForm")) {
            this._service.Add(this.taskModel).subscribe(m => {

                if (m.requestStatus == 1) {
                    this.Msg = "Role added successfully...";
                    CloseModal("#commonModal");
                } else {
                    this.Msg = "Error in saving record";
                    CloseModal("#commonModal");
                }
            })
        }
    }

}
