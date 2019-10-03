<<<<<<< HEAD
import dotenv from 'dotenv';
import express from 'express';
=======
const fs = require("fs"),
    http = require("http"),
    path = require("path"),
    methods = require("methods"),
    express = require("express"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    cors = require("cors"),
    passport = require("passport"),
    errorhandler = require("errorhandler"),
    mongoose = require("mongoose");

const isProduction = process.env.NODE_ENV === "production";
 
<<<<<<< HEAD
>>>>>>> CH(Docker): Set up Docker 168781673
=======
>>>>>>> Rebase commit
// Create global app object
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Barefoot Nomad!',
  });
});

app.use('*', (req, res) => {
  res.status(400).json({
    status: 400,
    message: 'Sorry this router does not exist !',
  });
});
const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Barefoot Nomad is runnig server On port ${port}...`));

export default app;
