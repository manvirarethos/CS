var db = require('../config/dbconfig');
//db.connect('mongodb://localhost:27017/storedb');

var Schema = db.Schema;

// create a schema
var contactSchema = new Schema({
    FirstName: {
        type: String,
        required: true,
        unique: false
    },
    LastName: {
        type: String,
        required: true
    },
    UserType: {
        type: String,
    },  
    Email: {
        type: String,
        required: true
       
    },
    Password: {
        type: String,
        required: true
    },
    Status:{type:String},
    Roles:  [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    Created_at: { type: Date, default: Date.now },
    Updated_at: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
var Users = db.model('Users', contactSchema);

// make this available to our users in our Node applications
module.exports = Users;