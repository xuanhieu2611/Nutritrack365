const express = require('express');
const { Provider } = require('react-redux');
const router = express.Router();
const connection = require('../database').databaseConnection

router.post('/check-account', (req, res) => {
  const username = req.body["username"];
  const sql = `SELECT EXISTS (SELECT * FROM User WHERE UID = ?);`
  connection.query(sql, [username], function (err, results, fields) {
    if (err) {
      res.send(err);
    } else {
      for (var key in results[0]) {
        userExists = results[0][key];
      }
      res.status(200).json({
        status: userExists === 1 ? 'User exists' : 'User does not exist',
        userExists: userExists === 1,
      })
    }
  })
});

router.get('/allSports', (req, res) => {
  const sql = `SELECT UID FROM User as U
WHERE NOT EXISTS (SELECT A.ActivityName
FROM Activities as A
WHERE NOT EXISTS (SELECT ud.UID
FROM User_Do_Exercise as ud 
WHERE ud.ActivityName = A.ActivityName
AND ud.UID = U.UID))`
  connection.query(sql, function (err, results, fields) {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  })
});


router.get('/count', (req, res) => {
  const sql = `SELECT COUNT(*) as numUsers, ActivityName FROM User_Do_Exercise GROUP BY ActivityName`
  connection.query(sql, function (err, results, fields) {
    if (err) {
      res.send(err);
      console.log(err)
    } else {
      res.send(results);
      console.log(results)
    }
  })
});


module.exports = router;
