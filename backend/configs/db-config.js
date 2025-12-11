const mongoose = require('mongoose');
const DB_URL = "mongodb+srv://RACO:P2zbjmPN2Az80ai3@invertory.lhz7idi.mongodb.net/easy-employee?retryWrites=true&w=majority&appName=Invertory";


const dbConnection = () => {
    mongoose.connect(DB_URL)
        .then(() => console.log('Database Connection Successfull'))
        .catch(err => console.log('Failed To Connect With Database, \nReason : ' + err.message))
}

module.exports = dbConnection;