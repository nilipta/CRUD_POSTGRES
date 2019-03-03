const {
    Client
} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb001',
    schema: 'public',
    password: 'nilipta',
    port: 5432,
})
try {
    client.connect(function (err, res) {
        if (err) {
            console.log("Connection failed to Postgres Database", err);
        } else {
            console.log("Connection Successfull to Postgres Database");
        }
    })
} catch (err) {
    console.log("Connection failed to Postgres Database", err)
}

module.exports = client;