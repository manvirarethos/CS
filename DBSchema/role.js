var db = require('../config/dbconfig');
//db.connect('mongodb://localhost:27017/storedb');

var Schema = db.Schema;

// create a schema
var roleSchema = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Title: {
        type: String,
        required: true,
        unique: false
    },
    RoleForUserType: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    },

    Tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]

});

// the schema is useless so far
// we need to create a model using it
var Role = db.model('Role', roleSchema);

// make this available to our users in our Node applications
module.exports = Role;