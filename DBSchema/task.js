var db = require('../config/dbconfig');
var subtask=require('./subtask');
//db.connect('mongodb://localhost:27017/storedb');

var Schema = db.Schema;
// create a schema
var taskSchema = new Schema({
    Heading : { type: Schema.Types.ObjectId, ref: 'Heading' },
    
    Level: {
        type: Number,
        required: true
        
    },
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Title: {
        type: String,
        required: true,
    },
    Url: {
        type: String,
        required: true,
    },
    cssClass: {
        type: String,
    },
    SortOrder:{
        type:Number,
        required:true
    },
    Status: {
        type: String,
        required: true,

    },
    SubTask:[subtask]
    

});

// the schema is useless so far
// we need to create a model using it
var Task = db.model('task', taskSchema);

// make this available to our users in our Node applications
module.exports = Task;