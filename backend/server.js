require('dotenv').config()

const express = require('express')
const cors = require('cors')

const userRoutes = require('./routes/User.js')
const utilRoutes = require('./routes/Util.js')
const exerciseRoutes = require('./routes/Exercises.js')
const eatRoutes = require('./routes/Eat.js')
const recordRoutes = require('./routes/Record.js')
const goalRoutes = require('./routes/Goal.js')
const recomRoutes = require('./routes/Recom.js')
const favRoutes = require('./routes/Favourite.js')
const connection = require('./database').databaseConnection

// Express app
const app = express()

// Cors
app.use(cors());
app.use(
  cors({
    origin: "*",
    methods: ['GET', 'DELETE', 'POST', 'PATCH'],
  })
)

// Middleware
app.use(express.json());       
app.use(express.urlencoded());

// Routes
app.use('/api/users/', userRoutes);
app.use('/api/util/', utilRoutes);
app.use('/api/exercises/', exerciseRoutes);
app.use('/api/eat/', eatRoutes);
app.use('/api/record/', recordRoutes);
app.use('/api/goal/', goalRoutes);
app.use('/api/recom/', recomRoutes);
app.use('/api/favourite/', favRoutes);

// Listen for requests

// create a new MySQL connection
app.listen(process.env.PORT, () => {
  console.log("connected to db & listening on port", process.env.PORT);
})

module.exports = app;
