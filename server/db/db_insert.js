var db_handler = require('./db_helper');

exports.insertData = function insertData(insertQuery) {
    return new Promise(function (resolve, reject) {

        db_handler.db_request(insertQuery)
            .then(function (data) {
                console.log("sensor Feedback inserted in node sensor data ");
                resolve();
            })
            .catch(err => {
                console.log("Error: occured in insert data.\r\nError Message: " + err);
                reject(new Error("Error occured while inserting data."));
            });
    });
};