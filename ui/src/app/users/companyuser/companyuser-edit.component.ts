import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CloseModal, ValidateMe, ValidationCheck } from '../../app.helpers';
import { UserService, RoleService } from '../../_services/_index';

@Component({
  selector: 'companyuserEdit',
  templateUrl: './companyuser-edit.component.html',

})
export class CompanyUserEditComponent {

  UserModel: any = {
    FirstName: '',
    LastName: '',
    UserType: '',
    Email: '',
    Password: '',
    Status: '',
    Roles: []
  };
  Msg: string;;
  private value: any = {};
  private Roles: any[];
  constructor(private _router: Router, private _route: ActivatedRoute, private _service: UserService, private _roleService: RoleService) {
  }
  ngOnInit() {
   
    this._route.params.subscribe(
      params => {

        this._service.GetOne(params["id"]).subscribe(m => {
          console.log("Data", m);
          if (m.requestStatus == 1) {
            this.UserModel = m.Data;
            this.GetUserTypeRoles();
            ValidateMe("#userForm");
          }
        })
      });
  }

  GetUserTypeRoles() {
    this._roleService.GetColumnWise({ condition: { "Status": "Active", "RoleForUserType": this.UserModel.UserType }, columns: "_id Name" }).subscribe(m => {
      if (m.requestStatus == 1) {
        this.Roles = m.lstData;
      }
    });
  }

  OnUserTypeChange() {
    this.GetUserTypeRoles();
  }
  ngAfterViewInit() { }

  onBack() {
    this._router.navigate(['/company/users']);
  }
  Save() {
    if (ValidationCheck("#userForm")) {
      this._service.Update(this.UserModel).subscribe(m => {
        console.log("Save Called", m);
        if (m.requestStatus == 1) {
          this.Msg = "User updated successfully...";
          CloseModal("#commonModal");
        } else {
          this.Msg = "Error in saving record";
          CloseModal("#commonModal");
        }
      })
    }
  }
  CheckTask(task, event) {
    console.log("Event Data", event);
    if (event == true) {
      this.UserModel.Roles.push(task._id)
    }
    else {
      this.UserModel.Roles.splice(this.UserModel.Roles.indexOf(task._id), 1);

    }
    console.log("Selected Roles", this.UserModel.Roles);
  }
  IsCheck(role) {
    if (this.UserModel.Roles.filter(m => m == role._id).length == 0)
    {
        return ""; 
    }
    else
    { 
        return "checked";
    }
}

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  public btnOK(ID) {

    CloseModal("#commonModal");


  }
}
