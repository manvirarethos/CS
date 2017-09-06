var express = require('express');
var router = express.Router();

var auth = require('./auth.js'); // Authentication 
var user = require('./user.js'); // user Api
var task = require('./task.js'); // task Api
var heading = require('./heading.js'); // heading Api
var role = require('./role.js'); // role Api

// Landing page for application
router.get('/', function (req, res, next) {
    res.render('index.html');

});




//var user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);

// User Api's
router.get('/api/user', user.getAllUser);
router.get('/api/user/:id', user.getOne);
router.post('/api/user', user.addUser);
router.put('/api/user/:id', user.updateUser);
router.delete('/api/user/:id', user.deleteUser);



// Heading Api
router.get('/api/heading', heading.getAllHeading);
router.get('/api/heading/:id', heading.getOne);
router.post('/api/heading', heading.addHeading);
router.put('/api/heading/:id', heading.updateHeading);
router.delete('/api/heading/:id', heading.deleteHeading);
router.post('/api/heading/columns', heading.getSelectiveColumns);
router.get('/api/menu/list', heading.GetMenu);

// Task Api
router.get('/api/task', task.getAllTask);
router.get('/api/task/:id', task.getOne);
router.post('/api/task', task.addTask);
router.put('/api/task/:id', task.updateTask);
router.delete('/api/task/:id', task.deleteTask);


// Heading Api
router.get('/api/role', role.getAllRole);
router.get('/api/role/:id', role.getOne);
router.post('/api/role', role.addRole);
router.put('/api/role/:id', role.updateRole);
router.delete('/api/role/:id', role.deleteRole);
router.post('/api/role/columns', role.getSelectiveColumns);


module.exports = router;