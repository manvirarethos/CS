var db = require('../config/dbconfig');
//db.connect('mongodb://localhost:27017/storedb');

var Schema = db.Schema;
// create a schema
var subtaskSchema = new Schema({
   
    Name: {
        type: String,
         },
    Title: {
        type: String,
       
    },
    Url: {
        type: String,
      
    }, 
    Status: {
        type: String,
      

    }
    

});

// // the schema is useless so far
// // we need to create a model using it
// var SubTask = db.model('subtask',subtaskSchema);

// make this available to our users in our Node applications
module.exports = subtaskSchema;