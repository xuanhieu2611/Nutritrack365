const express = require('express');
const router = express.Router();
const connection = require('../database').databaseConnection

// import {v4 as uuidv4} from 'uuid';
const uuid = require('uuid');

// GET ALL from Record
router.get("/", function(req, res) {
  connection.query(
    `SELECT * FROM Record_Hold`,
    function (err, results, fields) {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    })
});

// GET all record from a user
router.get("/specific", function(req, res) {
  const {UID} = req.query;
  const sql = `SELECT * FROM Record_Hold WHERE UID = ?`
  connection.query( sql,[UID], function (err, results, fields) {
    if (err) {
      res.json({error: err});
    } else {
      res.json(results);
    }
    })});

// GET all record from a user and date
router.get("/specific/date", async function(req, res) {
  const {UID, date} = req.query;
  const sql = `SELECT * FROM Record_Hold WHERE UID = ? AND Date = ?`
  connection.query( sql,[UID, date], function (err, results, fields) {
    if (err) {
      res.json({error: err});
    } else {
      connection.query(`SELECT SUM(Protein), SUM(Fat), SUM(Carb) FROM FoodNutrition WHERE FoodNutrition.FoodName = ANY (SELECT FoodName FROM Meal_Has_Food WHERE Meal_Has_Food.MealName = ANY ( SELECT MealName FROM Eats WHERE UID = ? and Date = ?))`, [UID, date], (err, ans) => {
        const protein = ans[0]["SUM(Protein)"] | "0";
        const fat = ans[0]["SUM(Fat)"] | "0";
        const carb = ans[0]["SUM(Carb)"] | "0";
        const calories = 4 * parseInt(carb) + 4 * parseInt(protein) + 9 * parseInt(fat);
        if (results.length != 0) {
          connection.query(`UPDATE Record_Hold SET Calories = ?, Protein = ?, Fat = ? WHERE UID = ? AND Date ?`, [calories.toString(), protein, fat, UID, date], (err, ans2) => {
            res.json([{"Calories" : calories.toString(), "Protein": protein, "Fat" :fat}]);
          })
        } else {
          connection.query(`INSERT INTO Record_Hold (RecordID, UID, Date, Calories, Protein, Fat) VALUES (?, ?, ?, ?, ?, ?)`, [uuid.v4().slice(0,10), UID, date, calories.toString(), protein, fat], (err, ans2) => {
            if (err) {
              res.json(err);
            } else {
              res.json([{"Calories" : calories.toString(), "Protein": protein, "Fat" :fat}]);
            }
          })
        }
      })

      } 
    })
   });
  
// CREATE a new Record
router.post('/', (req, res) => {
  const {recordID, UID, date, calories, protein, fat} = req.query;
  const sql = `INSERT INTO Record_Hold (RecordID, UID, Date, Calories, Protein, Fat) VALUES (?, ?, ?, ?, ?, ?)`
  connection.query( sql,[recordID, UID, date, calories, protein, fat], function (err, results, fields) {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
    })});

// DELETE an Record
router.delete("/", function(req, res) {
  const {recordID, UID} = req.query;
  connection.query(
    'DELETE FROM Record_Hold WHERE recordID = ? AND UID = ?', [ recordID, UID], 
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
