const express = require('express');
const db_get = require('./../../db/db_getter');

const router = express.Router();
var dbStatus = true;
const dbConnectionCheck = require('./../../db/db_connection');
if (dbConnectionCheck._connecting != true && dbConnectionCheck._connectionError != false) {
    this.dbStatus = false;
}



module.exports = router;

/** GET /health-check - Check service health */
router.get('/', (req, res) => {

    console.log("get request for all")
    const queryInsert = {
        text: `select * from primary_pump_section 
        union 
        select * from secondary_pump_section`
    };
    db_get.getDbData(queryInsert)
        .then((data) => {
            console.log(data);
            res.status(200).json(data);
        })
});
