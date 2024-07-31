const express = require('express');
const router = express.Router();
const connection = require('../database').databaseConnection

// GET ALL Users
router.get("/", function(req, res) {
  connection.query(
    `SELECT * FROM User`, 
    function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    })
});

// GET a specific user
router.get("/:uid", function(req, res) {
  connection.query(
    `SELECT * FROM User WHERE UID = ?`, [req.params.uid],
    function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    })
});

// CREATE a new users
router.post('/', (req, res) => {
  const {username, name, weight, height} = req.query;
  const sql = `INSERT INTO User(UID, Name, Weight, Height) VALUES (?, ?, ?, ?);`
  connection.query( sql,[username, name, weight, height], function (err, results, fields) {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
    })});

// Update a user
router.patch('/', (req, res) => {
  const {UID, name, weight, height} = req.query;
  const sql = `UPDATE User SET Name = ?, Weight = ?, Height = ? WHERE UID = ?`
  connection.query( sql,[name, weight, height, UID], function (err, results, fields) {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
    })});

// DELETE a user
router.delete("/:uid", function(req, res) {
  connection.query(
    'DELETE FROM User WHERE UID = ?', [ req.params.uid ], 
    function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    })
});

module.exports = router;
