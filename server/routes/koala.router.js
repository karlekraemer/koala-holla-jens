const express = require('express');
const koalaRouter = express.Router();

let koalas = [];

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    res.send(koalas);
});
// PUT
koalaRouter.post('/', (req, res) => {
    koalas.push(req.body);
    res.sendStatus(200);
});

// DELETE


module.exports = koalaRouter;


// router.get('/', (req, res) => {
//     let queryText = 'SELECT * from songs';
//     pool.query(queryText)
//     .then((result) => {
//         console.log('results from DB', result);
//         res.send(result.rows);
//     })
//     .catch((error) => {
//         console.log('error making a query', error);
//         res.sendStatus(500);
//     })
// });