import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Processing, CloseModal } from '../../app.helpers';
import { UserService ,SortingService} from '../../_services/_index';

@Component({
  selector: 'companyuserList',
  templateUrl: './companyuser-list.component.html',

})
export class CompanyUserListComponent {
  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;
  private DeleteItemID: any;
  private Data: any;

   OrderColumn: any;
  cols: any[] = [
    {
      name: "FirstName",
      title: "First Name",
      sorted: false,
      sortAs: "",
      sortable: true,
      cssClass: "fw-normal",
      direction: 1
    }
     ,
      {
      name: "LastName",
      title: "Last Name",
      sorted: false,
      sortAs: "",
      sortable: true,
      cssClass: "fw-normal",
      direction: 1
    } ,
      {
      name: "Email",
      title: "Email",
      sorted: false,
      sortAs: "",
      sortable: true,
      cssClass: "fw-normal",
      direction: 1
    }
     ,
    {
      name: "UserType",
      title: "User Type",
      sorted: false,
      sortAs: "",
      sortable: true,
      cssClass: "fw-normal",
      direction: -1
    }
    ,
    {
      name: "Status",
      title: "Status",
      sorted: false,
      sortAs: "",
      sortable: true,
      cssClass: "fw-normal",
      direction: -1
    },
    {
      name: "Name",
      title: "Action",
      sorted: false,
      sortAs: "",
      sortable: false,
      cssClass: "fw-normal width-100",
      direction: -1
    }
  ];
  constructor(private _router: Router, private _service: UserService,private  _sorting:SortingService) {
  }
  ngOnInit() {
    this._service.GetAll().subscribe(m => {
      console.log("All Data ", m);
      this.Data = m.lstData;
    });
  }
  ngAfterViewInit() { }

  onAdd() {
    this._router.navigate(['company/user/add']);
  }
  onEdit(user) {
    this._router.navigate(['company/user/edit', user._id]);
  }
  public onDelete(user) {
   // console.log(user);
    this.DeleteItemID = user;
    CloseModal("#commonModal");
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
 sortColum(col){
    this._sorting.sort(col,this.Data);
   }

  public btnOK(ID) {
    this._service.Delete(this.DeleteItemID._id).subscribe(m => {
      if (m.requestStatus == 1) {
        this.Data.splice(this.Data.indexOf(this.DeleteItemID), 1);
        CloseModal("#commonModal");
      }
      else {

      }
    })

  }
}
