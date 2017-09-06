import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Processing, CloseModal, ValidateMe, ValidationCheck } from '../../app.helpers';
import { TaskService , MenuService } from '../../_services/_index';
@Component({
  selector: 'app-addtask',
  templateUrl: './task.component.html',

})
export class TaskAddComponent {

  taskModel: any = {
    Heading: '',
    Level: '',
    Name: '',
    Title: '',
    Url: '',
    cssClass: '',
    SortOrder: 0,
    Status: '',
    SubTask: []
  };
  SubTask: any = { Name: '', Url: '', Status: '' };
  EditSubTask: any = { Name: '', Url: '', Status: '' };
  PreviousEdit: any;
  Msg: string;
  private value: any = {};
  Headings:any=[];
  constructor(private _router: Router, private _service: TaskService,private _menuService:MenuService) {
  }
  ngOnInit() {
    ValidateMe("#taskForm");
    this.GetHeading();
  }
  ngAfterViewInit() { }

  onBack() {
    this._router.navigate(['/task/tasklist']);
  }
  Save() {
    if (ValidationCheck("#taskForm")) {
      this._service.Add(this.taskModel).subscribe(m => {

        if (m.requestStatus == 1) {
          this.Msg = "Task added successfully...";
          CloseModal("#commonModal");
        } else {
          this.Msg = "Error in saving record";
          CloseModal("#commonModal");
        }
      })
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

  GetHeading(){
    this._menuService.GetColumnWise({condition:{}, columns:"id Heading"}).subscribe(m=>{
      console.log("Menus Items",m);
      if(m.requestStatus==1)
      this.Headings=m.lstData;
    });
  }

  AddSubTask() {
    this.taskModel.SubTask.push(this.SubTask);
    this.SubTask = { Name: '', Url: '', Status: '' };
  }

  EditSub(task) {
    if (this.PreviousEdit != undefined)
      this.PreviousEdit.Edit = false;
    task.Edit = true;
    this.PreviousEdit = task;
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
