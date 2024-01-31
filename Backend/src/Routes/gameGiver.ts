const expresss = require('express');
import { Request, Response } from 'express';
const router = expresss.Router();

const gameData = require('../controllers/gameFinder');

router.get('/', (req: Request, res: Response) => {
    res.json(gameData);
    console.log('Game requested.'); //delete later;.
});

module.exports = router;