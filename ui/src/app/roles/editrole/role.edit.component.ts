import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CloseModal, ValidateMe, ValidationCheck } from '../../app.helpers';
import { RoleService, MenuService } from '../../_services/_index';
@Component({
    selector: 'app-addedit',
    templateUrl: './role.edit.component.html',

})
export class RoleEditComponent {

    taskModel: any;
    Headings: any;
    Msg: string;
    private value: any = {};

    constructor(private _router: Router, private _route: ActivatedRoute, private _service: RoleService, private _menuSerive: MenuService) {
    }
    ngOnInit() {
        ValidateMe("#taskForm");
        this.GetHeading();
        this._route.params.subscribe(
            params => {

                this.GetRoleTask(params["id"]);
            });



    }
    ngAfterViewInit() { }


    GetRoleTask(ID) {
        this._service.GetOne(ID).subscribe(m => {
            if (m.requestStatus == 1) {
                this.taskModel = m.Data;
                
            }

        });
    }
    onBack() {
        this._router.navigate(['/role/list']);
    }


    public btnOK(ID) {

        CloseModal("#commonModal");


    }

    CheckTask(task, event) {
     
        if (event == true) {
            this.taskModel.Tasks.push(task._id)
        }
        else {
            this.taskModel.Tasks.splice(this.taskModel.Tasks.indexOf(task._id), 1);

        }
      
    }
    IsCheck(task) {
        if (this.taskModel.Tasks.filter(m => m == task._id).length == 0)
        {
            return ""; 
        }
        else
        { 
            return "checked";
        }
    }
    GetHeading() {
        this._menuSerive.GetDBMenu().subscribe(m => {
         
            this.Headings = m.lstData;
        });
    }

    Save() {
        if (ValidationCheck("#taskForm")) {
            this._service.Update(this.taskModel).subscribe(m => {

                if (m.requestStatus == 1) {
                    this.Msg = "Role updated successfully...";
                    CloseModal("#commonModal");
                } else {
                    this.Msg = "Error in saving record";
                    CloseModal("#commonModal");
                }
            })
        }
    }

}
