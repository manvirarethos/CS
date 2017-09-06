import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CloseModal, ValidationCheck, ValidateMe } from '../../app.helpers';
import { MenuService, SortingService } from '../../_services/_index';
@Component({
    selector: 'menulist',
    templateUrl: './menu.component.html',

})
export class MenuListComponent {
    private value: any = {};
    private _disabledV: string = '0';
    private disabled: boolean = false;
    private DeleteItemID: any;
    Data: any;
    AddModel: any = {
        Heading: '',
        CssClass: '',
        SortOrder: '',
        Status: ''

    }
    EditModel: any;
    PreviousEdit: any;
    /* Data Table Column */
    OrderColumn: any;
    cols: any[] = [
        {
            name: "Heading",
            title: "Heading",
            sorted: false,
            sortAs: "",
            sortable: true,
            cssClass: "fw-normal",
            direction: 1
        },
        {
            name: "CssClass",
            title: "Icon",
            sorted: false,
            sortAs: "",
            sortable: true,
            cssClass: "fw-normal",
            direction: -1
        },
        {
            name: "SortOrder",
            title: "Sort Order",
            sorted: false,
            sortAs: "",
            sortable: true,
            cssClass: "fw-normal",
            direction: -1
        },
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
            cssClass: "fw-normal width-150",
            direction: -1
        }
    ];
    Msg: String;
    Title: String;
    constructor(private _router: Router, private _service: MenuService, private _sorting: SortingService) {
    }
    ngOnInit() {
        ValidateMe("#headingForm");
        this.Refresh();
    }

    Refresh() {
        this._service.GetAll().subscribe(m => {

            this.Data = m.lstData;
        });
    }
    ngAfterViewInit() { }
    onBack() {
        this._router.navigate(['/task/tasklist']);
    }
   
    onEdit(edit) {
        if (this.PreviousEdit != undefined)
            this.PreviousEdit.Edit = false;
        this.PreviousEdit = edit;
        edit.Edit = true;
        this.EditModel = Object.assign({}, edit);
    }
    Update(edit) {


        if (ValidationCheck("#headingForm")) {
            this._service.Update(this.EditModel).subscribe(m => {

                if (m.requestStatus == 1) {
                    this.Title = "Save Confirmation"
                    this.Msg = "Heading updated successfully...";
                    // this.Refresh();
                    edit.Heading = this.EditModel.Heading;
                    edit.CssClass = this.EditModel.CssClass;
                    edit.SortOrder = this.EditModel.SortOrder;
                    edit.Status = this.EditModel.Status;
                    edit.Edit = false;
                    //  CloseModal("#commonModal");
                } else {
                    this.Title = "Save Confirmation"
                    this.Msg = "Error in saving record";
                    // CloseModal("#commonModal");
                }
            })

        }

    }
    Cancel(edit) {
        edit.Edit = false;
        //  this.EditModel=Object.assign({},edit);
    }
    public onDelete(ID) {
        this.Title = "Delete Confirmation"
        this.Msg = "Are you sure to delete this record ?";
        this.DeleteItemID = ID;
        CloseModal("#commonModal");
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
    Save() {
        if (ValidationCheck("#headingForm")) {
            this._service.Add(this.AddModel).subscribe(m => {

                if (m.requestStatus == 1) {
                    this.Title = "Save Confirmation"
                    this.Msg = "Heading added successfully...";
                    this.Refresh();
                    this.AddModel = { Heading: '', CssClass: '', SortOrder: '', Status: '' }
                    //  CloseModal("#commonModal");
                } else {
                    this.Title = "Save Confirmation"
                    this.Msg = "Error in saving record";
                    // CloseModal("#commonModal");
                }
            })
        }
    }
    sortColum(col) {
        this._sorting.sort(col, this.Data);
    }

}
