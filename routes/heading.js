var Heading = require('../DBSchema/menuheading');
var RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
var HeadingLib = {
  getAllHeading: function (req, res, next) {
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    Heading.find(function (err, all) {
      if (err) {
        RetuenModel.requestStatus = 0;
        RetuenModel.msg = "Error in saving data";
        res.json(RetuenModel);
      }
      else {
        RetuenModel.requestStatus = 1;
        RetuenModel.lstData = all;
        RetuenModel.msg = "Heading List";
      }

      res.json(RetuenModel);
    });
  },
  addHeading: function (req, res, next) {
    var ToAdd = new Heading(req.body);
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    Heading.create(ToAdd, function (err, post) {
      console.log("Error", err);
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
  updateHeading: function (req, res, next) {
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    Heading.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
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

  deleteHeading: function (req, res, next) {
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    Heading.findByIdAndRemove(req.params.id, function (err, post) {
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
    Heading.find(req.params.id, function (err, post) {
      if (err) {
        RetuenModel.requestStatus = 0;
        RetuenModel.msg = "Error in updating data";
        res.json(RetuenModel);
      }
      else {
        RetuenModel.requestStatus = 1;
        RetuenModel.Data = post;
        RetuenModel.msg = "Heading One Data";
      }

      res.json(RetuenModel);
    });
  },

  getSelectiveColumns: function (req, res, next) {
   
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] }
    Heading.find({}, req.body.columns, function (err, post) {
      if (!err) {
        RetuenModel.requestStatus = 1;
        RetuenModel.lstData = post;
        RetuenModel.msg = "Heading Column Data";
      }

      res.json(RetuenModel);
    });
  }

  ,

  GetMenu: function (req, res, next) {
    RetuenModel = { requestStatus: 0, Data: undefined, msg: 'Error In Processing your request', lstData: [] };
    Heading.aggregate([{ $lookup: { from: "tasks", localField: "_id", foreignField: "Heading", as: "Tasks" } }, { $sort: { SortOrder: 1 } }], function (err, post) {
      if (!err) {
        RetuenModel.requestStatus = 1;
        RetuenModel.Data = null;
        RetuenModel.lstData = post;
        RetuenModel.msg = "Menu Data";
      }

      res.json(RetuenModel);
    });
  }

}

module.exports = HeadingLib;