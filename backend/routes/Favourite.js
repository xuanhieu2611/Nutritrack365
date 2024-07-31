const express = require('express');
const router = express.Router();
const connection = require('../database').databaseConnection
const async = require('async')

// GET ALL from Eats
// router.get("/", function(req, res) {
//   connection.query(
//     `SELECT * FROM Eats`,
//     function (err, results, fields) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json(results);
//       }
//     })
// });

// // GET ALL from Eats
// router.get("/meal", function(req, res) {
//   connection.query(
//     `SELECT * FROM Meal`,
//     function (err, results, fields) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.json(results);
//       }
//     })
// });

// GET every that a specific user eats and date
router.get("/specific", function(req, res) {
  const {UID} = req.query;
  const sql = `SELECT * FROM Favourite_2 WHERE Favourite_2.FoodName = ANY (SELECT FoodName FROM Favourite_1 WHERE UID = ?)`
  connection.query( sql,[UID], function (err, results, fields) {
    if (err) {
      res.json({error: err});
    } else {
      res.json(results);
    }
    })});

// CREATE a new Eats (e.g. a user eats something new)
// router.post('/', (req, res) => {
//   const {UID, FoodName} = req.body;
//   const sql = `INSERT INTO Favourite_1(UID, FoodName) VALUES (?, ?)`
//   connection.query(sql, [UID, FoodName], (err,result) => {
//     if (err) {
//       res.json({error: err});
//     } else {
//       res.json(result);
//     } 
//   })
// });

//     // GET every that a specific user eats and date
// router.get("/specific/otherdate", function(req, res) {
//   const {UID, date} = req.query;
//   const sql = `SELECT * FROM Eats WHERE UID = ? and Date != ?`
//   connection.query( sql,[UID, date], function (err, results, fields) {
//     if (err) {
//       res.json({error: err});
//     } else {
//       res.json(results);
//     }
//     })});


// // CREATE a new Eats (e.g. a user eats something new)
// router.post('/', (req, res) => {
//   const {UID, mealName, date, amount} = req.query;
//   const sql = `INSERT INTO Eats (UID, MealName, Date, Amount) VALUES (?, ?, ?, ?)`
//   connection.query(sql, [UID, mealName, date, amount], (err,result) => {
//     if (err) {
//       res.json({error: err});
//     } else {
//       res.json(result);
//     } 
//   })
//   });

// // DELETE an Eats
// router.delete("/", function(req, res) {
//   const {UID, mealName, date} = req.query;
//   console.log(UID,mealName,date)
//   connection.query(
//     'DELETE FROM Eats WHERE UID = ? AND MealName = ? AND Date = ?', [ UID, mealName, date ], 
//     function (err, results, fields) {
//       if (err) {
//         res.send(err);
//       } else {
//         console.log(results);
//         res.json(results);
//       }
//     })
// });

module.exports = router;
