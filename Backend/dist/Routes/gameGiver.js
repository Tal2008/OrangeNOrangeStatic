"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresss = require('express');
const router = expresss.Router();
const gameData = require('../controllers/gameFinder');
router.get('/', (req, res) => {
    res.json(gameData);
    console.log('Game requested.'); //delete later;.
});
module.exports = router;
