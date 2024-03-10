require('dotenv').config({ path: '../../.env' });

const path = require('path');
const express = require('express');
const axios = require('axios'); 
const app = express();
const gameGiver = require('./Routes/gameGiver');
const ostGiver = require('./Routes/ostGiver')

const PORT: number = 8080;
app.use('/',express.static(path.join(__dirname,'..','..','public')));
console.log(path.join(__dirname,'..','..','public'));
app.use('/data/games', gameGiver);
app.use('/data/ost', ostGiver);
//move this to another file later

//app.listen(PORT);
module.exports = app;
