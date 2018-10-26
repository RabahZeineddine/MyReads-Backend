const firebaseDB = require('../FIREBASE/firebaseDB');


var database;

firebaseDB.getDatabase((result) => {
    database = result;
});

const getUserByEmail = (user) => {
    return new Promise((resolve, reject) => {
        database.ref(firebaseDB.USER_DOCUMENT).orderByChild('email').equalTo(user.email.toLowerCase()).on("value", function(snapshot) {
            var fb_user;
            if(snapshot.val())
                fb_user = snapshot.val()[Object.keys(snapshot.val())[0]] || null;
            else fb_user = null
            if (fb_user) {
                fb_user.email = user.email;
                resolve(fb_user);
            }
            reject({ statusCode: 404, errorMsg: "USER_NOT_FOUND", error:true });
        })
    })

}

const addUser = (user) => {
    return new Promise((resolve, reject) => {
        getUserByEmail(user).then(() => {
            reject({ statusCode: 200, errorMsg: "USER_ALREADY_EXISTS", error:true });
        }).catch((error) => {
            if (error.statusCode == 404) {
                let key = database.ref().child('users').push().key
                database.ref(firebaseDB.USER_DOCUMENT + '/' + key ).set({
                    password: user.password,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email.toLowerCase()
                });
                resolve();
            }
        });
    })
}




module.exports = {
    getUserByEmail,
    addUser
}