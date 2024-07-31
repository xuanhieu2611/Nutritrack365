const express = require('express');
const router = express.Router();
const connection = require('../database').databaseConnection
const async = require('async')

// GET ALL from Eats
router.get("/", function(req, res) {
  connection.query(
    `SELECT * FROM Eats`,
    function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    })
});

// GET ALL from Eats
router.get("/meal", function(req, res) {
  connection.query(
    `SELECT * FROM Meal`,
    function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    })
});

// GET every that a specific user eats and date
router.get("/specific/date", function(req, res) {
  const {UID, date} = req.query;
  const sql = `SELECT MealName FROM Eats WHERE UID = ? and Date = ?`
  connection.query( sql,[UID, date], function (err, results, fields) {
    if (err) {
      res.json({error: err});
    } else {
      res.json(results);
    }
    })});

    // GET every that a specific user eats and date
router.get("/specific/otherdate", function(req, res) {
  const {UID, date} = req.query;
  const sql = `SELECT * FROM Eats WHERE UID = ? and Date != ?`
  connection.query( sql,[UID, date], function (err, results, fields) {
    if (err) {
      res.json({error: err});
    } else {
      res.json(results);
    }
    })});


// CREATE a new Eats (e.g. a user eats something new)
router.post('/', (req, res) => {
  const {UID, mealName, date, amount} = req.query;
  connection.query(`SELECT Amount FROM Eats WHERE UID = ? and MealName = ? and Date = ? `, [UID, mealName, date], (err, result) => {
    if (err) {
      res.json({error: err});
      return;
    } 
    if (result.length == 0) {
      const sql = `INSERT INTO Eats (UID, MealName, Date, Amount) VALUES (?, ?, ?, ?)`
      connection.query(sql, [UID, mealName, date, amount], (err,ans) => {
        if (err) {
          res.json({error: err});
        } else {
          res.json(ans);
        } 
      })
    } else {
      console.log(result);
      const sql = `UPDATE Eats SET Amount = ? WHERE UID = ? and MealName = ? and Date = ?`
      connection.query(sql, [parseInt(result[0].Amount) + parseInt(amount), UID, mealName, date], (err,ans) => {
        if (err) {
          res.json({error: err});
        } else {
          res.json(ans);
        }
      })}
  })});

// DELETE an Eats
router.delete("/", function(req, res) {
  const {UID, mealName, date} = req.query;
  console.log(UID,mealName,date)
  connection.query(
    'DELETE FROM Eats WHERE UID = ? AND MealName = ? AND Date = ?', [ UID, mealName, date ], 
    function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        console.log(results);
        res.json(results);
      }
    })
});

module.exports = router;
