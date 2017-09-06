var db = require('../config/dbconfig');
//db.connect('mongodb://localhost:27017/storedb');

var Schema = db.Schema;

// create a schema
var headingSchema = new Schema({
    Heading: {
        type: String,
        required: true,
        unique: false
    },
    SortOrder: {
        type: String,
        required: true,
     
    },
    CssClass:{
        type:String,
        required:true
    },
     Status:{
        type:String,
        required:true
    },
     Tasks : [{ type: Schema.Types.ObjectId, ref: 'Task' }]

});

// the schema is useless so far
// we need to create a model using it
var Heading = db.model('Heading', headingSchema);

// make this available to our users in our Node applications
module.exports = Heading;