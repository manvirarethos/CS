var Task = require('../DBSchema/task');
var RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
var TaskLib = {
  getAllTask: function (req, res, next) {

    Task.find(function (err, all) {
      if (err) {
        RetuenModel.requestStatus = 0;
        RetuenModel.msg = "Error in saving data";
        res.json(RetuenModel);
      }
      else {
        RetuenModel.requestStatus = 1;
        RetuenModel.lstData = all;
        RetuenModel.msg = "Task List";
      }

      res.json(RetuenModel);
    });
  },
  addTask: function (req, res, next) {
    var ToAdd = new Task(req.body);
   
    //ToAdd.Password = "Singh@007";
    // console.log("Data Model", ToAdd);
    Task.create(ToAdd, function (err, post) {
      console.log("Error",err);
      if (err) {
      RetuenModel.requestStatus = 0;
        RetuenModel.msg = "Error in saving data";
      //  res.json(RetuenModel);
      }
      else {
        RetuenModel.requestStatus = 1;
        RetuenModel.Data = post;
        RetuenModel.msg = "Saved successfully";
      }
      res.json(RetuenModel);
    });

  },
  updateTask: function (req, res, next) {
    Task.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) {
      RetuenModel.requestStatus = 0;
        RetuenModel.msg = "Error in updating data";
        res.json(RetuenModel);
      }
      else {
        RetuenModel.requestStatus = 1;
        RetuenModel.Data = post;
        RetuenModel.msg = "Updated successfully";
      }
      res.json(RetuenModel);
    });
  },

  deleteTask: function (req, res, next) {
    Task.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) {
      RetuenModel.requestStatus = 0;
        RetuenModel.msg = "Error in deleting data";
        res.json(RetuenModel);
      }
      else {
        RetuenModel.requestStatus = 1;
        RetuenModel.lstData = post;
        RetuenModel.Data = undefined;
        RetuenModel.msg = "Deleted successfully";
      }
      res.json(RetuenModel);
    });
  }
  ,
  getOne: function (req, res, next) {
    Task.findOne({"_id": req.params.id}, function (err, post) {
      if (err) {
      RetuenModel.requestStatus = 0;
        RetuenModel.msg = "Error in updating data";
        res.json(RetuenModel);
      }
      else {
        RetuenModel.requestStatus = 1;
        RetuenModel.Data = post;
        RetuenModel.msg = "Task Data";
      }

      res.json(RetuenModel);
    });
  },

  
  

}

module.exports = TaskLib;

// db.tasks.aggregate(   [     { $group : { _id : {Heading:"$Heading",cssClass:"$cssClass"}, submenu: { $push: "$$ROOT" } } }   ]).pretty()
