var firebase = require('firebase');

var USER_DOCUMENT = 'users';

// Initialize Firebase
var config = {
    apiKey: process.env.apiKey || 'AIzaSyCxT0EcOif39gnkwZ5lnbFuwYGh0YPNRLg' ,
    authDomain: process.env.authDomain || 'myreads-773fd.firebaseapp.com' ,
    databaseURL: process.env.databaseURL || 'https://myreads-773fd.firebaseio.com'
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