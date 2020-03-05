const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
   let queryText = 'SELECT  gifs.id, gifs.description, gifs.url, gifs.category_id, category.category_name FROM gifs JOIN category ON gifs.category_id = category.id;'
   pool.query(queryText).then(results => {
     res.send(results.rows);
   }).catch(error => {
     console.log('error getting koalas', error);
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
      console.log(`Error adding a new Koala`, error);
      res.sendStatus(500);
    });
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  // let  = req.body;
  // let id = req.params.id;

  // console.log(`updating transfer of a koala ${id}`, koala);
  // let queryString = `UPDATE "gifs" SET ready_to_transfer = 'Y' WHERE "id" = ${id}`
  // pool.query(queryString).then((results) => {
  //   res.sendStatus(200);
  // }).catch((err) => {
  //   res.sendStatus(500);
  //   console.log(err);
  })
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
