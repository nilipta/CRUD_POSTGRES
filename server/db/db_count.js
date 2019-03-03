var db_handler = require('./db_helper');

exports.getDbData = function getcount(query) {
    return new Promise(function (resolve, reject) {

        db_handler.db_request(query)
            .then(function (data) {
                console.log('fetched heartBeat From db ');
                resolve(data);
            })
            .catch(err => {
                console.log("Error: occured while fetching heart beat.\r\nError Message:" + err);
                reject(new Error("Error occured while fetching heart beat."));
            });
    });
}