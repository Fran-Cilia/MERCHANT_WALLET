const { Client } = require('pg');
const { path } = require('.');
require('dotenv').config({path:__dirname+'/./../.env'});

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

// const operations = async () => {
//     try {
//         let pool = await client.connect()
//         let products = await client.query("SELECT * from users")
//         console.log(products);
        
//     } catch (error) {
//         console.log(error);
//     }
// }



module.exports = { client };