const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');


// const Koalas = pg.Koalas; // THIS BREAKS SHIT 


koalaRouter.get('/', (req, res) => {
    console.log('in the koalaRouter get');
    let queryText = 'SELECT * from koalas_table';
    pool.query(queryText)
        .then((result) => {
            console.log('results from DB', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error making a query', error);
            res.sendStatus(500);
        })
});

// POST
koalaRouter.post('/', (req, res) => {
    const theNewKoala = req.body;
    const queryText = `
    INSERT INTO "koalas_table" ("name", "age", "gender", "transfer", "notes")
    VALUES ('${theNewKoala.name}', ${theNewKoala.age}, '${theNewKoala.gender}, '${theNewKoala.transfer}, '${theNewKoala.notes}');
    `;
    pool.query(queryText)
       .then((result) => {
            console.log('result', result);
            res.sendStatus(201);
       })
       .catch((error) => {
            console.log(error);
            res.sendStatus(500);
       })
});

koalaRouter.put('/ready_to_transfer/:id', (req, res) => {
    const transfer = req.body.transfer;
    let queryText = '';
    if(transfer == 'N'){
        queryText = `UPDATE "koalas_table" SET "transfer"='Y' WHERE "id"=${req.params.id};`;
    } else {
        res.sendStatus(500);
        return;
    }
    pool.query(queryText)
    .then((dbResponse) => {
        console.log('dbResponse', dbResponse);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
})


module.exports = koalaRouter;

