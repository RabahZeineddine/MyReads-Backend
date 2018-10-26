var firebase = require('firebase');

var USER_DOCUMENT = 'users';

// Initialize Firebase
var config = {
    apiKey: process.env.apiKey || 'AIzaSyDQjUEBzhT2ZMP1Yp_auUM87KSnJdT6ems' ,
    authDomain: process.env.authDomain || 'readable-66329.firebaseapp.com' ,
    databaseURL: process.env.databaseURL || 'https://readable-66329.firebaseio.com'
};

firebase.initializeApp(config);


var database;

const initDatabase= (callback) => {
    database = firebase.database();
    callback(false);
}


const getDatabase = (callback) => {
    if (database == undefined) {
        initDatabase((error) => {
            if (error) {
                callback(database);
            } else {
                callback(database);
            }
        })
    } else {
        callback(database);
    }
}

module.exports = {
    getDatabase,
    USER_DOCUMENT
};