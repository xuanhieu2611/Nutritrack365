const express = require('express');
const router = express.Router();
const connection = require('../database').databaseConnection
const async = require('async')

// GET ALL Exercises
router.get("/", function(req, res) {
  connection.query(
    `SELECT * FROM User_Do_Exercise`,
    function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    })
});

// GET all Exercises done by a specific user
router.get("/specific/date", function(req, res) {
  const {UID, date} = req.query;
  const sql = `SELECT *
FROM (
    SELECT User_Do_Exercise.UID, User_Do_Exercise.ActivityName, Exercise_Activities.Hours, User_Do_Exercise.Date
    FROM Exercise_Activities
    INNER JOIN User_Do_Exercise 
    ON User_Do_Exercise.ActivityName = Exercise_Activities.ActivityName AND User_Do_Exercise.Date = Exercise_Activities.Date
) AS x
WHERE x.UID = ? AND x.Date = ?`
  connection.query( sql,[UID, date], function (err, results, fields) {
    if (err) {
      res.json({error: "error"});
    } else {
      res.json(results);
    }
    })});

    // GET all Exercises done by a specific user
router.get("/specific/otherdate", function(req, res) {
  const {UID, date} = req.query;
  const sql = `SELECT *
FROM (
    SELECT User_Do_Exercise.UID, User_Do_Exercise.ActivityName, Exercise_Activities.Hours, User_Do_Exercise.Date
    FROM Exercise_Activities
    INNER JOIN User_Do_Exercise 
    ON User_Do_Exercise.ActivityName = Exercise_Activities.ActivityName AND User_Do_Exercise.Date = Exercise_Activities.Date
) AS x
WHERE x.UID = ? AND x.Date != ?`
  connection.query( sql,[UID, date], function (err, results, fields) {
    if (err) {
      res.json({error: err});
    } else {
      res.json(results);
    }
    })});


// CREATE a new exercise for a specific user
router.post('/', (req, res) => {
  const {UID, date, activityName, hour} = req.query;
  const sql1 = `INSERT INTO Exercise_Activities(Date, ActivityName, Hours) VALUES(?, ?, ?)`
  const sql2 = `INSERT INTO User_Do_Exercise (UID, Date, ActivityName) VALUES (?, ?, ?);`
  var return_data = {};

    async.parallel([
       function(parallel_done) {
           connection.query(sql1,[date, activityName, hour], function(err, results) {
               if (err) return parallel_done(err);
               return_data.table1 = results;
               parallel_done();
           });
       },
       function(parallel_done) {
           connection.query(sql2, [UID, date, activityName], function(err, results) {
               if (err) return parallel_done(err);
               return_data.table2 = results;
               parallel_done();
           });
       }
    ], function(err) {
         if (err) {
          res.send(err);
        } else {
         res.send(return_data);
      }
    });});

// DELETE an exercise for a specific user
router.delete("/", function(req, res) {
  const {UID, date, activityName} = req.query;
  connection.query(
    'DELETE FROM User_Do_Exercise WHERE UID = ? AND Date = ? AND ActivityName = ?', [ UID, date, activityName ], 
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
