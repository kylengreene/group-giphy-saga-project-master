const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  let queryText = 'SELECT  gifs.id, gifs.description, gifs.url, gifs.category_id, category.category_name FROM gifs JOIN category ON gifs.category_id = category.id ORDER BY "id" ASC;'
  pool.query(queryText).then(results => {
    res.send(results.rows);
    console.log('logging favrite row in router', results.rows);

  }).catch(error => {
    console.log('error getting gifs', error);
    res.sendStatus(500);
  })

});

// add a new favorite 
router.post('/', (req, res) => {
  let newGif = req.body
  console.log(`Adding gif`, newGif);

  let queryText = `INSERT INTO "gifs" ("description", "url", "category_id")
                     VALUES ($1, $2, $3);`;
  pool.query(queryText, [newGif.description, newGif.url, newGif.category_id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding a favorite`, error);
      res.sendStatus(500);
    });
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  console.log('logging body', req.body.category_id );
  let category_id = req.body.category_id;

  let queryString = `UPDATE "gifs" SET category_id = ${category_id} WHERE "id" = ${req.params.favId}`
  pool.query(queryString).then((results) => {
    res.sendStatus(200);
  }).catch((err) => {
    res.sendStatus(500);
    console.log(err);
  })
});

// delete a favorite
router.delete('/:id', (req, res) => {

  let gifId = req.body.gifId;
  let queryText = `DELETE FROM gifs WHERE id=$1`
  pool.query(queryText, [gifId]).then((results) => {
    res.sendStatus(200);
  }).catch((err) => {
    res.sendStatus(500);
    console.log(err);
  })
});

module.exports = router;
