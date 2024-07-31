const express = require('express');
const router = express.Router();
const connection = require('../database').databaseConnection


// GET ALL from Recom
router.get("/", function(req, res) {
  connection.query(
    `SELECT * FROM Recommendation`,
    function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    })
});

module.exports = router;
