const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

app.use(express.json());

app.listen(3000, () => console.log("Server listening on port 3000"));
