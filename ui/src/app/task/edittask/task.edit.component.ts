import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Processing, CloseModal, ValidateMe, ValidationCheck } from '../../app.helpers';
import { TaskService,MenuService } from '../../_services/_index';
@Component({
  selector: 'app-addedit',
  templateUrl: './task.edit.component.html',


})
export class TaskEditComponent  {
  hasChanges:boolean=false;
  taskModel: any;
  SubTask: any = { Name: '', Url: '', Status: '' };
  EditSubTask: any = { Name: '', Url: '', Status: '' };
  PreviousEdit:any;
  Msg: string;
  private value: any = {};
   Headings:any=[];
  constructor(private _router: Router, private _route: ActivatedRoute, private _service: TaskService,private _menuService:MenuService) {
  }
  ngOnInit() {
    ValidateMe("#taskForm");
    this.GetHeading();
    this._route.params.subscribe(
      params => {

        this._service.GetOne(params["id"]).subscribe(m => {
          console.log("Data dsd", m);
          if (m.requestStatus == 1) {
            this.taskModel = m.Data;
          }
        })
      });
  //this.hasChanges=true;
  }

  onchange(){
    console.log("Changes");
    this.hasChanges=true;
  }
 
  ngAfterViewInit() { }
  GetHeading(){
    this._menuService.GetColumnWise({condition:{}, columns:"id Heading"}).subscribe(m=>{
      console.log("Menus Items",m);
      if(m.requestStatus==1)
      this.Headings=m.lstData;
    });
  }
  onBack() {
    this._router.navigate(['/task/tasklist']);
  }
  Save() {
    if (ValidationCheck("#taskForm")) {
      this._service.Update(this.taskModel).subscribe(m => {

        if (m.requestStatus == 1) {
          this.Msg = "Task updated successfully...";
          CloseModal("#commonModal");
        } else {
          this.Msg = "Error in saving record";
          CloseModal("#commonModal");
        }
        this.hasChanges=false;
      })
    }
  }

  public btnOK(ID) {

    CloseModal("#commonModal");


  }

  AddSubTask() {
    this.taskModel.SubTask.push(this.SubTask);
    this.SubTask = { Name: '', Url: '', Status: '' };
  }

  EditSub(task) {
    if(this.PreviousEdit!=undefined)
      this.PreviousEdit.Edit=false;
    task.Edit = true;
    this.PreviousEdit=task;
    this.EditSubTask = Object.assign({}, task);
  }
  UpdateSub(task) {
    task.Edit = false;
    task.Name = this.EditSubTask.Name;
    task.Url = this.EditSubTask.Url;
    task.Status = this.EditSubTask.Status;
  }
  CancelSub(task) {
    task.Edit = false;
  }
  DeleteSub(task) {
    console.log(this.taskModel.SubTask.indexOf(task));
    this.taskModel.SubTask.splice(this.taskModel.SubTask.indexOf(task), 1);
  }
}
