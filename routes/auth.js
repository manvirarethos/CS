var jwt = require('jwt-simple');
var User = require('./user.js'); // User Table 
var auth = {
    login: function (req, res) {


        var username =req.body.username || '';
        var password = req.body.password || '';
        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        // Fire a query to your DB and check if the credentials are valid
        auth.validate(username, password, function (data) {
            console.log('Login user', data);
            if (data.requestStatus==0) { // If authentication fails, we send a 401 back
                //  res.status(401);
                res.json(data);
                return;
            }
            if (data) {
                // If authentication is success, we will generate a token
                // and dispatch it to the client
                res.json(genToken(data));
            }
        });

    },
    validate: function (username, password, cb) {
        // spoofing the DB response for simplicity
        User.validateUser({ Email: username, Password: password }, function (data) {
            console.log("Data Base Return for  Validate User", data);
            if (data!=undefined)
            { cb(data); }
            else {
                cb(undefined)
            }
        });

    },
    validateUser: function (username) {
        // spoofing the DB response for simplicity

        var dbUserObj = { // spoofing a userobject from the DB. 
            name: 'arvind',
            role: 'admin',
            username: 'arvind@myapp.com'
        };
        return dbUserObj;
    },
}
// private method
function genToken(user) {
    console.log("Under token");
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());
    return {
        requestStatus: 1,
        token: token,
        expires: expires,
        user: user.Data
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}
module.exports = auth;