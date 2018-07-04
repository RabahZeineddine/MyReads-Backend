var firebase = require('firebase');

var USER_DOCUMENT = 'users';

// Initialize Firebase
var config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL
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