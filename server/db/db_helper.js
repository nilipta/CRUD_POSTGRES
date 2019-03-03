var pg_Client = require('./db_connection');

/**********************************************************************
.Postgres Configuration Fetching
**********************************************************************/
exports.db_request = function db_request(sql) {
    return new Promise(function (resolve, reject) {
        pg_Client.query(sql, (err, res) => {
            if (err == null) {
                console.log(sql + "  query executed successfully.");
                resolve(res.rows);
            }
            else {
                console.log("Error: occured in db_request while executing " + sql + " query. \r\n Error Message: " + err);
                reject(err);
            }
        });
    });
}