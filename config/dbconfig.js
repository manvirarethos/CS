var db = require('mongoose');
var promise = db.connect('mongodb://localhost:27017/storedb', {
  useMongoClient: true,
  /* other options */
});
promise.then(function(db) {
//  console.log("connection",db)
  //* Use `db`, for instance `db.model()`
  
});
module.exports = db;