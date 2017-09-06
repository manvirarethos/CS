var User = require('../DBSchema/user');
var RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
var UserLib = {
  getAllUser: function (req, res, next) {
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    User.find({},"FirstName LastName Email UserType Status",function (err, all) {
      if (err) {
        RetuenModel.requestStatus = 0;
        RetuenModel.msg = "Error in saving data";
        res.json(RetuenModel);
      }
      else {
        RetuenModel.requestStatus = 1;
        RetuenModel.lstData = all;
        RetuenModel.msg = "User List";
      }

      res.json(RetuenModel);
    });
  },
  addUser: function (req, res, next) {
    var ToAdd = new User(req.body);
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    ToAdd.Email = ToAdd.Email.toLowerCase();
    //ToAdd.Password = "Singh@007";
    // console.log("Data Model", ToAdd);
    User.create(ToAdd, function (err, post) {
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
  updateUser: function (req, res, next) {
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
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

  deleteUser: function (req, res, next) {
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    User.findByIdAndRemove(req.params.id, function (err, post) {
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
    User.findOne({"_id": req.params.id}, function (err, post) {
      if (err) {
      RetuenModel.requestStatus = 0;
        RetuenModel.msg = "Error in updating data";
        res.json(RetuenModel);
      }
      else {
        RetuenModel.requestStatus = 1;
        RetuenModel.Data = post;
        RetuenModel.msg = "User Data";
      }

      res.json(RetuenModel);
    });
  }
  ,
  validateUser: function (model, cb) {
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }

    User.findOne(model, function (err, post) {

      if (err) {
      RetuenModel.requestStatus = 0;
        RetuenModel.requestStatus = 0;
        RetuenModel.msg = "Invalid username/password";

      }
      else {
        if (post == undefined) {
          RetuenModel.requestStatus = 0;
          RetuenModel.Data = undefined;
          RetuenModel.lstData=undefined;
          RetuenModel.msg = "Invalid username/password";

        } else {
          RetuenModel.requestStatus = 1;
          RetuenModel.Data = post;
          RetuenModel.msg = "Logined successfully";
        }

      }
      cb(RetuenModel);
    });
  }

}

module.exports = UserLib;