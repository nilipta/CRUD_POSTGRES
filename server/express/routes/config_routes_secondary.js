const express = require('express');
const db_controller = require('./../../controller/db_controller');

const router = express.Router();
var dbStatus = true;
const dbConnectionCheck = require('./../../db/db_connection');
if (dbConnectionCheck._connecting != true && dbConnectionCheck._connectionError != false) {
    this.dbStatus = false;
}



module.exports = router;

/** GET /health-check - Check service health */
router.get('/', (req, res) => {

    console.log("get request for secondary")
    res.status(200).json('OK get command');
});

/** GET /health-check - Check service health */
router.post('/', (req, res) => {

    console.log("post request")
    console.log(req.body);
    let reqbody = req.body;
    const queryInsert = {
        text: `INSERT INTO public.secondary_pump_section(
            slave_id, "default_Freq", "Ramp_up", "Ramp_down", "Function_code", "Address", "Running_Frequency") values($1, $2, $3, $4, $5, $6, $7)`,
        values: [reqbody.slave_id, reqbody.default_Freq, reqbody.Ramp_up, reqbody.Ramp_down, reqbody.Function_code, reqbody.Address, reqbody.Running_Frequency]
    };

    const querycount = {
        text: `SELECT count(1) FROM secondary_pump_section  WHERE pump_section_id=1;`,
    };

    const queryUpdate = {
        text: `UPDATE public.secondary_pump_section
        SET slave_id=$1, "default_Freq"=$2, "Ramp_up"=$3, "Ramp_down"=$4, "Function_code"=$5, "Address"=$6, "Running_Frequency"=$7
        WHERE pump_section_id=1;`,
        values: [reqbody.slave_id, reqbody.default_Freq, reqbody.Ramp_up, reqbody.Ramp_down, reqbody.Function_code, reqbody.Address, reqbody.Running_Frequency]
    };
    if (dbStatus) {
        db_controller.save(querycount, queryInsert, queryUpdate);
    }
    else {
        console.log("database connection is not vailable.")
    }
    res.status(200).json('OK post command');
});

// router.route('/')
//     .post(asyncHandler(insert));


// async function insert(req, res) {
//     let user = await userCtrl.insert(req.body);
//     res.json(user);
// }