const expresss = require('express');
import { Request, Response } from 'express';
const router = expresss.Router();

const ostData = require('../controllers/ostsGen');

router.get('/', (req: Request, res: Response) => {
    res.json(ostData);
    console.log('Songs requested.'); //delete later;.
});

module.exports = router;