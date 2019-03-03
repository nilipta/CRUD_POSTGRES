const moment = require('moment');


const config = require('./config/config');
const app = require('./express/express');

app.listen(config.port, () => {
    console.info(`server started on port ${config.port}`);
});


