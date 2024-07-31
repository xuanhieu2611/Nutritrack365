const express = require('express');
const router = express.Router();
const connection = require('../database').databaseConnection

// GET ALL from Goal
router.get("/", function(req, res) {
  connection.query(
    `SELECT * FROM Goal`,
    function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    })
});

// GET a goal for a specific user
router.get("/specific", function(req, res) {
  const {goalId} = req.query;
  console.log(goalId);
  const sql = `SELECT * FROM Goal WHERE GoalId = ?`
  connection.query( sql,[goalId], function (err, results, fields) {
    if (err) {
      res.json({error: err});
    } else {
      res.json(results);
    }
    })});


// CREATE a new Goal
router.post('/', (req, res) => {
  const {goalID, calories, protein, fat} = req.query;
  const sql = `INSERT INTO Goal (GoalID, Calories, Protein, Fat) VALUES (?, ?, ?, ?)`
  connection.query( sql,[goalID, calories, protein, fat], function (err, results, fields) {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
    })});

// DELETE a Goal
router.delete("/", function(req, res) {
  const {goalID} = req.query;
  connection.query(
    'DELETE FROM Goal WHERE GoalID = ?', [ goalID ], 
    function (err, results, fields) {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.json(results);
        console.log(results);
      }
    })
});

module.exports = router;
