var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/login', (req, res) => {
    var body = req.body;

    if(body.email && body.password != null ){
        let user = body;
        UserDAO.getUserByEmail(user).then( ( fb_user ) =>{
            if( fb_user.password.toLowerCase() == user.password.toLowerCase() ){
                delete fb_user.password;
                res.status(200).json({error: false, statusCode: 200, user: fb_user});
            }else{
                res.status(403).json({errorMsg: "WRONG_PASSWORD"});
            }
        }).catch((error) => {
            res.status(error.statusCode).json(error);
        })
    }else{
        res.status(400).json({error: true, statusCode: 400, errorMsg: "BAD_REQUEST"});
    }
})

app.post('/signup', (req,res) => {
  // res.status(409).json({error: true, statusCode:500 ,errorMsg: "USER_ALREADY_EXISTS" })
    res.status(200).json({error: false, statusCode:200, user: { firstname: 'Rabah' , email: 'rabah.zeineddine@gmail.com' }})
})


module.exports = app;
