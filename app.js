var express = require('express');
var path = require('path');
var bodyParser= require('body-parser');
var logger = require('morgan');
var cors = require('cors')

require('dotenv').load()

var UserDAO = require('./srcBuild/DAO/UserDAO')


var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/login', (req, res) => {
    var body = req.body;

    if(body.email && body.password != null ){
        let user = body;
        UserDAO.getUserByEmail(user).then( ( fb_user ) =>{
            if( fb_user.password.toLowerCase() == user.password.toLowerCase() ){
                delete fb_user.password;
                res.status(200).json({error: false, statusCode: 200, user: fb_user, msg: "USER_LOGGED_SUCCESSFULLY"});
            }else{
                res.status(403).json({errorMsg: "WRONG_CREDENTIALS" , error: true, statusCode:403});
            }
        }).catch((error) => {
            console.log(error)
            res.status(error.statusCode).json(error);
        })
    }else{
        res.status(400).json({error: true, statusCode: 400, errorMsg: "BAD_REQUEST"});
    }
})

app.post('/signup', (req,res) => {
    var body = req.body;
    if (body.firstname && body.lastname && body.email && body.password ) {
        var user = body
        UserDAO.addUser(user).then(function () {
            delete user.password;
            delete user.confirmPassword;
            res.status(200).json({ msg: "USER_REGISTERED_SUCCESSFULLY" , user, error: false , statusCode: 200 });
        }).catch((error) => {
            res.status(error.statusCode).json(error);
        })
    } else {
        res.status(400).json({ errorMsg: "BAD_REQUEST", error: true, statusCode: 400 });
    }
})


module.exports = app;
