const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'koalas', 
    max: 10,
    idleTImeoutMillis: 30000
});

pool.on('connect', () => {
    console.log("postgres is connected")
})

pool.on('error', (error) => {
    console.log('not working my boy', error)
})



module.exports = pool;
