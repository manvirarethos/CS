var Role = require('../DBSchema/role');
var RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
var RoleLib = {
  getAllRole: function (req, res, next) {
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    Role.find(function (err, all) {
      if (err) {
        RetuenModel.requestStatus = 0;
        RetuenModel.msg = "Error in saving data";
        res.json(RetuenModel);
      }
      else {
        RetuenModel.requestStatus = 1;
        RetuenModel.lstData = all;
        RetuenModel.msg = "Role List";
      }

      res.json(RetuenModel);
    });
  },
  addRole: function (req, res, next) {
    var ToAdd = new Role(req.body);
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    Role.create(ToAdd, function (err, post) {
     // console.log("Error", err);
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
  updateRole: function (req, res, next) {
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    Role.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
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

  deleteRole: function (req, res, next) {
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    Role.findByIdAndRemove(req.params.id, function (err, post) {
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
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    Role.findById(req.params.id, function (err, post) {
      if (err) {
        RetuenModel.requestStatus = 0;
        RetuenModel.msg = "Error in updating data";
        res.json(RetuenModel);
      }
      else {
        RetuenModel.requestStatus = 1;
        RetuenModel.Data = post;
        RetuenModel.msg = "Role One Data";
      }

      res.json(RetuenModel);
    });
  },

  getSelectiveColumns: function (req, res, next) {
   
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    Role.find(req.body.condition, req.body.columns, function (err, post) {
      if (!err) {
        RetuenModel.requestStatus = 1;
        RetuenModel.lstData = post;
        RetuenModel.msg = "Role Column Data";
      }

      res.json(RetuenModel);
    });
  },

  GetActiveRole:function(req,res,next){
    
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    Role.find({"Status":"Active"}, "Name", function (err, post) {
      if (!err) {
        RetuenModel.requestStatus = 1;
        RetuenModel.lstData = post;
        RetuenModel.msg = "All Active Roles";
      }

      res.json(RetuenModel);
    });
  }

  

}

module.exports = RoleLib;