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
  age: {
    type: Number,
    min: 18,
    max: 90
  },
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Contact = db.model('Contact', contactSchema);

// make this available to our users in our Node applications
module.exports = Contact;