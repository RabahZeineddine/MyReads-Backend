const firebaseDB = require('../FIREBASE/firebaseDB');


var database;

firebaseDB.getDatabase((result) => {
    database = result;
});





const getUsers = () => {
    return new Promise((resolve, reject) => {
        database.ref(firebaseDB.USER_DOCUMENT).once('value').then((snapshot) => {
            var users = snapshot.val() || null;
            if (users) resolve(users);
            reject();
        })
    })
}


const getUserByEmail = (user) => {
    return new Promise((resolve, reject) => {
        database.ref(firebaseDB.USER_DOCUMENT).orderByChild('email').equalTo(user.email).on("value", function(snapshot) {
            var fb_user = snapshot.val() || null;
                if (fb_user) {
                    fb_user.email = user.email;
                    resolve(fb_user);
                }
                reject({ statusCode: 404, errorMsg: "USER_NOT_FOUND", error:true });
        });
    })

}

const addUser = (user) => {
    return new Promise((resolve, reject) => {
        getUserByEmail(user).then((fb_user) => {
            reject({ statusCode: 409, errorMsg: "USER_ALREADY_EXISTS", error:true });
        }).catch((error) => {
            if (error.statusCode == 404) {
                database.ref(firebaseDB.USER_DOCUMENT + '/' + user.email).set({
                    password: user.password,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                });
                resolve();
            }
        });
    })
}




module.exports = {
    getUsers,
    getUserByEmail,
    addUser
}